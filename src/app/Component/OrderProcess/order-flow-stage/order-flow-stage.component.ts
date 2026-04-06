import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../../Shared/pagination/pagination.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  OrderFlowStageFilterDto,
  OrderFlowStageRequestDto,
} from '../../../Model/OrderFlowStage';
import { OrderFlowFilterDto } from '../../../Model/OrderFlow';
import { UserResponseDto } from '../../../Model/UserResponseDto';
import { AGGridHelper } from '../../../Shared/Service/AGGridHelper';
import { AuthService } from '../../../Shared/Service/auth.service';
import { CommonHelper } from '../../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../../Shared/Service/http-helper.service';

@Component({
  selector: 'app-order-flow-stage',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './order-flow-stage.component.html',
  styleUrl: './order-flow-stage.component.scss',
  providers: [DatePipe],
})
export class OrderFlowStageComponent implements OnInit {
  private orderflowstageGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public oOrderFlowFilterDto = new OrderFlowFilterDto();
  public oOrderFlowStageFilterDto = new OrderFlowStageFilterDto();
  public oOrderFlowStageRequestDto = new OrderFlowStageRequestDto();
  public oCurrentUser = new UserResponseDto();

  public orderFlowList: any[] = [];

  public orderflowstageId = 0;
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
    {
      field: 'orderFlowName',
      width: 150,
      headerName: 'Order Flow Name',
      filter: true,
    },
    { field: 'name', width: 150, headerName: 'Name', filter: true },
    { field: 'code', width: 150, headerName: 'Code', filter: true },
    { field: 'icon', width: 150, headerName: 'Icon', filter: true },
    { field: 'colorCode', width: 150, headerName: 'Color', filter: true },
    { field: 'sequenceNo', headerName: 'Sequence No' },
    { field: 'isInitialStage', headerName: 'Is Initial Stage' },
    { field: 'isFinalStage', headerName: 'Is Final Stage' },
    { field: 'customerVisible', headerName: 'Customer Visible' },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByOrderFlow: TrackByFunction<any> | any;
  trackByOrderFlowFrom: TrackByFunction<any> | any;
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
    this.GetAllOrderFlows();
    this.GetOrderFlowStage();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetOrderFlowStage();
  }

  onGridReadyTransection(params: any) {
    this.orderflowstageGridApi = params.api;
    this.rowData = [];
  }

  Filter() {
    this.GetOrderFlowStage();
  }

  private GetOrderFlowStage() {
    this.oOrderFlowStageFilterDto.orderFlowId =
      Number(this.oOrderFlowStageFilterDto.orderFlowId) || 0;
    this.oOrderFlowStageFilterDto.sequenceNo =
      Number(this.oOrderFlowStageFilterDto.sequenceNo) || 0;
    this.oOrderFlowStageFilterDto.isActive = CommonHelper.booleanConvert(
      this.oOrderFlowStageFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlowStage/GetOrderFlowStage?pageNumber=${this.pageIndex}`,
        this.oOrderFlowStageFilterDto,
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

  private GetAllOrderFlows() {
    this.oOrderFlowFilterDto.companyId =
      Number(CommonHelper.GetComapyId()) || 0;
    this.oOrderFlowFilterDto.isActive = true;
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`OrderFlow/GetAllOrderFlows`, this.oOrderFlowFilterDto)
      .subscribe(
        (res: any) => {
          this.orderFlowList = res;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public InsertOrderFlowStage() {
    if (this.oOrderFlowStageRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    if (this.oOrderFlowStageRequestDto.orderFlowId == 0) {
      this.toast.warning('Please enter order flow', 'Warning!!', {
        progressBar: true,
      });
      return;
    }

    this.oOrderFlowStageRequestDto.sequenceNo = Number(
      this.oOrderFlowStageRequestDto.sequenceNo,
    );
    this.oOrderFlowStageRequestDto.orderFlowId = Number(
      this.oOrderFlowStageRequestDto.orderFlowId,
    );
    this.oOrderFlowStageRequestDto.isInitialStage = CommonHelper.booleanConvert(
      this.oOrderFlowStageRequestDto.isInitialStage,
    );
    this.oOrderFlowStageRequestDto.isFinalStage = CommonHelper.booleanConvert(
      this.oOrderFlowStageRequestDto.isFinalStage,
    );
    this.oOrderFlowStageRequestDto.customerVisible =
      CommonHelper.booleanConvert(
        this.oOrderFlowStageRequestDto.customerVisible,
      );
    this.oOrderFlowStageRequestDto.isActive = CommonHelper.booleanConvert(
      this.oOrderFlowStageRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlowStage/InsertOrderFlowStage`,
        this.oOrderFlowStageRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetOrderFlowStage();
          this.toast.success('Data Save Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public UpdateOrderFlowStage() {
    if (this.oOrderFlowStageRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    if (this.oOrderFlowStageRequestDto.orderFlowId == 0) {
      this.toast.warning('Please enter order flow', 'Warning!!', {
        progressBar: true,
      });
      return;
    }

    this.oOrderFlowStageRequestDto.sequenceNo = Number(
      this.oOrderFlowStageRequestDto.sequenceNo,
    );
    this.oOrderFlowStageRequestDto.orderFlowId = Number(
      this.oOrderFlowStageRequestDto.orderFlowId,
    );
    this.oOrderFlowStageRequestDto.isInitialStage = CommonHelper.booleanConvert(
      this.oOrderFlowStageRequestDto.isInitialStage,
    );
    this.oOrderFlowStageRequestDto.isFinalStage = CommonHelper.booleanConvert(
      this.oOrderFlowStageRequestDto.isFinalStage,
    );
    this.oOrderFlowStageRequestDto.customerVisible =
      CommonHelper.booleanConvert(
        this.oOrderFlowStageRequestDto.customerVisible,
      );
    this.oOrderFlowStageRequestDto.isActive = CommonHelper.booleanConvert(
      this.oOrderFlowStageRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlowStage/UpdateOrderFlowStage/${this.orderflowstageId}`,
        this.oOrderFlowStageRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetOrderFlowStage();
          this.toast.success('Data Update Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  public DeleteOrderFlowStage() {
    this.oOrderFlowStageRequestDto.isActive = CommonHelper.booleanConvert(
      this.oOrderFlowStageRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlowStage/DeleteOrderFlowStage/${this.orderflowstageId}`,
        this.oOrderFlowStageRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonDelete');
          this.GetOrderFlowStage();
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
    this.oOrderFlowStageRequestDto = new OrderFlowStageRequestDto();
    this.orderflowstageId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(
      this.orderflowstageGridApi,
    );
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.orderflowstageId = Number(getSelectedItem.id);
    this.oOrderFlowStageRequestDto.name = getSelectedItem.name;
    this.oOrderFlowStageRequestDto.code = getSelectedItem.code;
    this.oOrderFlowStageRequestDto.icon = getSelectedItem.icon;
    this.oOrderFlowStageRequestDto.colorCode = getSelectedItem.colorCode;
    this.oOrderFlowStageRequestDto.sequenceNo = Number(
      getSelectedItem.sequenceNo,
    );
    this.oOrderFlowStageRequestDto.orderFlowId = Number(
      getSelectedItem.orderFlowId,
    );
    this.oOrderFlowStageRequestDto.isInitialStage = CommonHelper.booleanConvert(
      getSelectedItem.isInitialStage,
    );
    this.oOrderFlowStageRequestDto.isFinalStage = CommonHelper.booleanConvert(
      getSelectedItem.isFinalStage,
    );
    this.oOrderFlowStageRequestDto.customerVisible =
      CommonHelper.booleanConvert(getSelectedItem.customerVisible);
    this.oOrderFlowStageRequestDto.isActive = CommonHelper.booleanConvert(
      getSelectedItem.isActive,
    );
    this.oOrderFlowStageRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick('openCommonModel');
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(
      this.orderflowstageGridApi,
    );
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.orderflowstageId = Number(getSelectedItem.id);
    this.oOrderFlowStageRequestDto = getSelectedItem;
    CommonHelper.CommonButtonClick('openCommonDelete');
  }
}
