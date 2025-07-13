import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { PackTypeFilterDto, PackTypeRequestDto } from '../../Model/PackType';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { PaginationComponent } from '../../Shared/pagination/pagination.component';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';

@Component({
  selector: 'app-pack-type',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './pack-type.component.html',
  styleUrl: './pack-type.component.scss',
  providers: [DatePipe]
})
export class PackTypeComponent implements OnInit {

  private packtypeGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public oPackTypeFilterDto = new PackTypeFilterDto();
  public oPackTypeRequestDto = new PackTypeRequestDto();
  public oCurrentUser = new UserResponseDto();

  public packtypeId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;


  public colDefsTransection: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 90, editable: false, checkboxSelection: false },
    { field: 'name', width: 150, headerName: 'PackType Name', filter: true },
    { field: 'subPackTypeName', width: 150, headerName: 'Sub PackType Name', filter: true },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByPackType: TrackByFunction<any> | any;
  trackByPackTypeFrom: TrackByFunction<any> | any;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe) {
    this.oCurrentUser = CommonHelper.GetUser();
  }


  ngOnInit(): void {
    this.GetPackType();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetPackType();
  }

  onGridReadyTransection(params: any) {
    this.packtypeGridApi = params.api;
    this.rowData = [];
  }

  Filter() {
    this.GetPackType();
  }

  private GetPackType() {
    this.oPackTypeFilterDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oPackTypeFilterDto.isActive = CommonHelper.booleanConvert(this.oPackTypeFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`PackType/GetPackType?pageNumber=${this.pageIndex}`, this.oPackTypeFilterDto).subscribe(
      (res: any) => {
        this.rowData = res.items;
        this.pageIndex = res.pageIndex;
        this.totalPages = res.totalPages;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }




  public InsertPackType() {

    if (this.oPackTypeRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oPackTypeFilterDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oPackTypeRequestDto.isActive = CommonHelper.booleanConvert(this.oPackTypeRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`PackType/InsertPackType`, this.oPackTypeRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetPackType();
        this.toast.success("Data Save Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }

  public UpdatePackType() {

    if (this.oPackTypeRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oPackTypeFilterDto.companyId = Number(this.oCurrentUser?.companyId);

    this.oPackTypeRequestDto.isActive = CommonHelper.booleanConvert(this.oPackTypeRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`PackType/UpdatePackType/${this.packtypeId}`, this.oPackTypeRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetPackType();
        this.toast.success("Data Update Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  public DeletePackType() {
    this.oPackTypeRequestDto.isActive = CommonHelper.booleanConvert(this.oPackTypeRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`PackType/DeletePackType/${this.packtypeId}`, this.oPackTypeRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonDelete");
        this.GetPackType();
        this.toast.success("Data Delete Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  add() {
    CommonHelper.CommonButtonClick("openCommonModel");
    this.oPackTypeRequestDto = new PackTypeRequestDto();
    this.packtypeId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.packtypeGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.packtypeId = Number(getSelectedItem.id);
    this.oPackTypeRequestDto.name = getSelectedItem.name;
    this.oPackTypeRequestDto.shortName = getSelectedItem.shortName;
    this.oPackTypeRequestDto.isActive = CommonHelper.booleanConvert(getSelectedItem.isActive);
    this.oPackTypeRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick("openCommonModel");
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.packtypeGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.packtypeId = Number(getSelectedItem.id);
    this.oPackTypeRequestDto = getSelectedItem;
    CommonHelper.CommonButtonClick("openCommonDelete");
  }


}

