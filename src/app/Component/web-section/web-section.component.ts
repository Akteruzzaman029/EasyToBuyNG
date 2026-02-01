import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { PaginationComponent } from "../../Shared/pagination/pagination.component";
import { WebsiteSectionFilterDto, WebsiteSectionRequestDto } from '../../Model/WebsiteSection';

@Component({
  selector: 'app-web-section',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './web-section.component.html',
  styleUrl: './web-section.component.scss',
  providers: [DatePipe]
})
export class WebSectionComponent implements OnInit {

  private gridApi!: any;
  public DefaultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];
  public oFilterDto = new WebsiteSectionFilterDto();
  public oRequestDto = new WebsiteSectionRequestDto();

  public sectionId = 0;
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;
  public hasPreviousPage: boolean = false;
  public hasNextPage: boolean = false;

  public colDefs: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 70, editable: false },
    { field: 'name', width: 180, headerName: 'Section Name', filter: true },
    { field: 'headerName', width: 200, headerName: 'Header Title', filter: true },
    { field: 'sequenceNo', width: 120, headerName: 'Sequence' },
    { field: 'remarks', width: 250, headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status', width: 120, cellRenderer: (params: any) => params.value ? 'Active' : 'Inactive' },
  ];

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.GetSections();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetSections();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  Filter() {
    this.pageIndex = 1;
    this.GetSections();
  }

  private GetSections() {
    this.oFilterDto.isActive = CommonHelper.booleanConvert(this.oFilterDto.isActive);

    this.http.Post(`WebsiteSection/GetWebsiteSection?pageNumber=${this.pageIndex}`, this.oFilterDto).subscribe(
      (res: any) => {
        this.rowData = res.items;
        this.pageIndex = res.pageIndex;
        this.totalPages = res.totalPages;
        this.totalRecords = res.totalRecords;
        this.hasPreviousPage = res.hasPreviousPage;
        this.hasNextPage = res.hasNextPage;
        if (this.gridApi) this.gridApi.sizeColumnsToFit();
      },
      (err) => {
        this.toast.error(err.message || "Failed to load sections", "Error!!");
      }
    );
  }

  public SaveSection() {
    if (!this.oRequestDto.name || !this.oRequestDto.headerName) {
      this.toast.warning("Please fill required fields", "Warning!!");
      return;
    }

    let currentUser = CommonHelper.GetUser();
    this.oRequestDto.userId = currentUser?.userId;
    this.oRequestDto.isActive = CommonHelper.booleanConvert(this.oRequestDto.isActive);

    const url = this.sectionId === 0 ? 'WebsiteSection/InsertWebsiteSection' : `WebsiteSection/UpdateWebsiteSection/${this.sectionId}`;

    this.http.Post(url, this.oRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetSections();
        this.toast.success(res.message, "Success!!");
      },
      (err) => {
        this.toast.error(err.message, "Error!!");
      }
    );
  }

  public DeleteSection() {
    this.http.Post(`WebsiteSection/DeleteWebsiteSection/${this.sectionId}`, this.oRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonDelete");
        this.GetSections();
        this.toast.success("Data Deleted Successfully!!", "Success!!");
      },
      (err) => {
        this.toast.error(err.message, "Error!!");
      }
    );
  }

  add() {
    this.sectionId = 0;
    this.oRequestDto = new WebsiteSectionRequestDto();
    this.oRequestDto.isActive = true;
    CommonHelper.CommonButtonClick("openCommonModel");
  }

  edit() {
    let selected = AGGridHelper.GetSelectedRow(this.gridApi);
    if (selected) {
      this.sectionId = Number(selected.id);
      this.oRequestDto = { ...selected };
      CommonHelper.CommonButtonClick("openCommonModel");
    } else {
      this.toast.warning("Please select an item");
    }
  }

  delete() {
    let selected = AGGridHelper.GetSelectedRow(this.gridApi);

    if (!selected) {
      this.toast.warning("Please select an item", "Warning!!");
      return;
    }
    this.sectionId = Number(selected.id);
    this.oRequestDto.name = selected.name;
    CommonHelper.CommonButtonClick("openCommonDelete");
  }
}