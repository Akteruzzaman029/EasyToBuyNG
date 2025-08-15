import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { CompanyFilterDto, CompanyRequestDto } from '../../Model/Company';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { PaginationComponent } from '../../Shared/pagination/pagination.component';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AgGridAngular, PaginationComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
  providers: [DatePipe]
})
export class CompanyComponent implements OnInit {

  private companyGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public oCompanyFilterDto = new CompanyFilterDto();
  public oCompanyRequestDto = new CompanyRequestDto();
  public oCurrentUser = new UserResponseDto();

  public companyId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;


  public colDefsTransection: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 90, editable: false, checkboxSelection: false },
    { field: 'code', width: 150, headerName: 'Code', filter: true },
    { field: 'name', width: 150, headerName: 'Name', filter: true },
    { field: 'shortName', width: 150, headerName: 'Short Name', filter: true },
    { field: 'address', width: 150, headerName: 'Address', filter: true },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByCompany: TrackByFunction<any> | any;
  trackByCompanyFrom: TrackByFunction<any> | any;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe) {
    this.oCurrentUser = CommonHelper.GetUser();
  }


  ngOnInit(): void {
    this.GetCompany();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetCompany();
  }

  onGridReadyTransection(params: any) {
    this.companyGridApi = params.api;
    this.rowData = [];
  }

  Filter() {
    this.GetCompany();
  }

  private GetCompany() {

    this.oCompanyFilterDto.isActive = CommonHelper.booleanConvert(this.oCompanyFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Company/GetCompany?pageNumber=${this.pageIndex}`, this.oCompanyFilterDto).subscribe(
      (res: any) => {
        this.rowData = res.items;
        this.pageIndex = res.pageIndex;
        this.totalRecords = res.totalRecords;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }




  public InsertCompany() {

    if (this.oCompanyRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oCompanyRequestDto.isActive = CommonHelper.booleanConvert(this.oCompanyRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Company/InsertCompany`, this.oCompanyRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetCompany();
        this.toast.success("Data Save Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }

  public UpdateCompany() {

    if (this.oCompanyRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oCompanyRequestDto.isActive = CommonHelper.booleanConvert(this.oCompanyRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Company/UpdateCompany/${this.companyId}`, this.oCompanyRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetCompany();
        this.toast.success("Data Update Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  public DeleteCompany() {
    this.oCompanyRequestDto.isActive = CommonHelper.booleanConvert(this.oCompanyRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Company/DeleteCompany/${this.companyId}`, this.oCompanyRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonDelete");
        this.GetCompany();
        this.toast.success("Data Delete Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  add() {
    CommonHelper.CommonButtonClick("openCommonModel");
    this.oCompanyRequestDto = new CompanyRequestDto();
    this.companyId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.companyGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.companyId = Number(getSelectedItem.id);
    this.oCompanyRequestDto.code = getSelectedItem.code;
    this.oCompanyRequestDto.name = getSelectedItem.name;
    this.oCompanyRequestDto.shortName = getSelectedItem.shortName;
    this.oCompanyRequestDto.address = getSelectedItem.address;
    this.oCompanyRequestDto.isActive = CommonHelper.booleanConvert(getSelectedItem.isActive);
    this.oCompanyRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick("openCommonModel");
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.companyGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.companyId = Number(getSelectedItem.id);
    this.oCompanyRequestDto = getSelectedItem;
    CommonHelper.CommonButtonClick("openCommonDelete");
  }


}

