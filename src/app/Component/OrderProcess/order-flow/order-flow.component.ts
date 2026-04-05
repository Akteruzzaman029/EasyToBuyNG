import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../../Shared/pagination/pagination.component';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  OrderFlowFilterDto,
  OrderFlowRequestDto,
} from '../../../Model/OrderFlow';
import { UserResponseDto } from '../../../Model/UserResponseDto';
import { AGGridHelper } from '../../../Shared/Service/AGGridHelper';
import { AuthService } from '../../../Shared/Service/auth.service';
import { CommonHelper } from '../../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../../Shared/Service/http-helper.service';
import { OrderTypeFilterDto } from '../../../Model/OrderType';

@Component({
  selector: 'app-order-flow',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular,
    RouterModule,
    PaginationComponent,
  ],
  templateUrl: './order-flow.component.html',
  styleUrl: './order-flow.component.scss',
  providers: [DatePipe],
})
export class OrderFlowComponent implements OnInit {
  private orderflowGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public oOrderTypeFilterDto = new OrderTypeFilterDto();
  public oOrderFlowFilterDto = new OrderFlowFilterDto();
  public oOrderFlowRequestDto = new OrderFlowRequestDto();
  public oCurrentUser = new UserResponseDto();

  public orderTypeList: any[] = [];

  public orderflowId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;

  public colDefsTransection: any[] = [
    {
      valueGetter: 'node.rowIndex + 1',
      headerName: 'SL',
      width: 90,
      editable: false,
      checkboxSelection: false,
    },
    { field: 'name', width: 150, headerName: 'Name', filter: true },
    {
      field: 'orderTypeName',
      width: 150,
      headerName: 'Order Type',
      filter: true,
    },
    { field: 'isDefault', headerName: 'Is Default' },
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
    private datePipe: DatePipe,
  ) {
    this.oCurrentUser = CommonHelper.GetUser();
  }

  ngOnInit(): void {
    this.GetAllOrderTypes();
    this.GetOrderFlow();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetOrderFlow();
  }

  onGridReadyTransection(params: any) {
    this.orderflowGridApi = params.api;
    this.rowData = [];
  }

  Filter() {
    this.GetOrderFlow();
  }

  private GetOrderFlow() {
    this.oOrderFlowFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oOrderFlowFilterDto.isActive = CommonHelper.booleanConvert(
      this.oOrderFlowFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlow/GetOrderFlow?pageNumber=${this.pageIndex}`,
        this.oOrderFlowFilterDto,
      )
      .subscribe(
        (res: any) => {
          this.rowData = res.items;
          this.pageIndex = res.pageIndex;
          this.totalRecords = res.totalRecords;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

    private GetAllOrderTypes() {
    this.oOrderTypeFilterDto.companyId = Number(CommonHelper.GetComapyId()) || 0;
    this.oOrderTypeFilterDto.isActive = true;
    // After the hash is generated, proceed with the API call
    this.http.Post(`OrderType/GetAllOrderTypes`, this.oOrderTypeFilterDto).subscribe(
      (res: any) => {
        this.orderTypeList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }


  public InsertOrderFlow() {
    if (this.oOrderFlowRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    if (this.oOrderFlowRequestDto.oderTypeId == 0) {
      this.toast.warning('Please enter order type', 'Warning!!', {
        progressBar: true,
      });
      return;
    }

    this.oOrderFlowRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oOrderFlowRequestDto.oderTypeId = Number(
      this.oOrderFlowRequestDto.oderTypeId,
    );
    this.oOrderFlowRequestDto.isDefault = CommonHelper.booleanConvert(
      this.oOrderFlowRequestDto.isDefault,
    );
    this.oOrderFlowRequestDto.isActive = CommonHelper.booleanConvert(
      this.oOrderFlowRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`OrderFlow/InsertOrderFlow`, this.oOrderFlowRequestDto)
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetOrderFlow();
          this.toast.success('Data Save Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public UpdateOrderFlow() {
    if (this.oOrderFlowRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    if (this.oOrderFlowRequestDto.oderTypeId == 0) {
      this.toast.warning('Please enter order type', 'Warning!!', {
        progressBar: true,
      });
      return;
    }

    this.oOrderFlowRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oOrderFlowRequestDto.oderTypeId = Number(
      this.oOrderFlowRequestDto.oderTypeId,
    );
    this.oOrderFlowRequestDto.isDefault = CommonHelper.booleanConvert(
      this.oOrderFlowRequestDto.isDefault,
    );
    this.oOrderFlowRequestDto.isActive = CommonHelper.booleanConvert(
      this.oOrderFlowRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlow/UpdateOrderFlow/${this.orderflowId}`,
        this.oOrderFlowRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetOrderFlow();
          this.toast.success('Data Update Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  public DeleteOrderFlow() {
    this.oOrderFlowRequestDto.isActive = CommonHelper.booleanConvert(
      this.oOrderFlowRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlow/DeleteOrderFlow/${this.orderflowId}`,
        this.oOrderFlowRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonDelete');
          this.GetOrderFlow();
          this.toast.success('Data Delete Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  add() {
    CommonHelper.CommonButtonClick('openCommonModel');
    this.oOrderFlowRequestDto = new OrderFlowRequestDto();
    this.orderflowId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.orderflowGridApi);
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.orderflowId = Number(getSelectedItem.id);
    this.oOrderFlowRequestDto.name = getSelectedItem.name;
    this.oOrderFlowRequestDto.companyId = Number(getSelectedItem.companyId);
    this.oOrderFlowRequestDto.oderTypeId = Number(getSelectedItem.oderTypeId);
    this.oOrderFlowRequestDto.isDefault = CommonHelper.booleanConvert(
      getSelectedItem.isDefault,
    );
    this.oOrderFlowRequestDto.isActive = CommonHelper.booleanConvert(
      getSelectedItem.isActive,
    );
    this.oOrderFlowRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick('openCommonModel');
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.orderflowGridApi);
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.orderflowId = Number(getSelectedItem.id);
    this.oOrderFlowRequestDto = getSelectedItem;
    CommonHelper.CommonButtonClick('openCommonDelete');
  }
}
