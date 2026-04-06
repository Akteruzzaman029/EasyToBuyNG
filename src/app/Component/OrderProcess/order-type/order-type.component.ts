import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrService } from 'ngx-toastr';
import { UserResponseDto } from '../../../Model/UserResponseDto';
import { PaginationComponent } from '../../../Shared/pagination/pagination.component';
import { AGGridHelper } from '../../../Shared/Service/AGGridHelper';
import { AuthService } from '../../../Shared/Service/auth.service';
import { CommonHelper } from '../../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../../Shared/Service/http-helper.service';
import { OrderTypeFilterDto, OrderTypeRequestDto } from '../../../Model/OrderType';

@Component({
  selector: 'app-order-type',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './order-type.component.html',
  styleUrl: './order-type.component.scss',
    providers: [DatePipe]
})
export class OrderTypeComponent implements OnInit {

  private ordertypeGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public oOrderTypeFilterDto = new OrderTypeFilterDto();
  public oOrderTypeRequestDto = new OrderTypeRequestDto();
  public oCurrentUser = new UserResponseDto();

  public ordertypeId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;


  public colDefsTransection: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 90, editable: false, checkboxSelection: false },
    { field: 'name', width: 150, headerName: 'Name', filter: true },
    { field: 'code', width: 150, headerName: 'Code', filter: true },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByOrderType: TrackByFunction<any> | any;
  trackByOrderTypeFrom: TrackByFunction<any> | any;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe) {
    this.oCurrentUser = CommonHelper.GetUser();
  }


  ngOnInit(): void {
    this.GetOrderType();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetOrderType();
  }

  onGridReadyTransection(params: any) {
    this.ordertypeGridApi = params.api;
    this.rowData = [];
  }

  Filter() {
    this.GetOrderType();
  }

  private GetOrderType() {

    this.oOrderTypeFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oOrderTypeFilterDto.isActive = CommonHelper.booleanConvert(this.oOrderTypeFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`OrderType/GetOrderType?pageNumber=${this.pageIndex}`, this.oOrderTypeFilterDto).subscribe(
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




  public InsertOrderType() {

    if (this.oOrderTypeRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oOrderTypeRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oOrderTypeRequestDto.isActive = CommonHelper.booleanConvert(this.oOrderTypeRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`OrderType/InsertOrderType`, this.oOrderTypeRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetOrderType();
        this.toast.success("Data Save Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }

  public UpdateOrderType() {

    if (this.oOrderTypeRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oOrderTypeRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oOrderTypeRequestDto.isActive = CommonHelper.booleanConvert(this.oOrderTypeRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`OrderType/UpdateOrderType/${this.ordertypeId}`, this.oOrderTypeRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetOrderType();
        this.toast.success("Data Update Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  public DeleteOrderType() {
    this.oOrderTypeRequestDto.isActive = CommonHelper.booleanConvert(this.oOrderTypeRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`OrderType/DeleteOrderType/${this.ordertypeId}`, this.oOrderTypeRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonDelete");
        this.GetOrderType();
        this.toast.success("Data Delete Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  add() {
    CommonHelper.CommonButtonClick("openCommonModel");
    this.oOrderTypeRequestDto = new OrderTypeRequestDto();
    this.ordertypeId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.ordertypeGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.ordertypeId = Number(getSelectedItem.id);
    this.oOrderTypeRequestDto.name = getSelectedItem.name;
    this.oOrderTypeRequestDto.code = getSelectedItem.code;
    this.oOrderTypeRequestDto.isActive = CommonHelper.booleanConvert(getSelectedItem.isActive);
    this.oOrderTypeRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick("openCommonModel");
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.ordertypeGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.ordertypeId = Number(getSelectedItem.id);
    this.oOrderTypeRequestDto = getSelectedItem;
    CommonHelper.CommonButtonClick("openCommonDelete");
  }


}

