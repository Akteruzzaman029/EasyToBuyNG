import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../../Shared/pagination/pagination.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderFlowStageFilterDto } from '../../../Model/OrderFlowStage';
import {
  OrderFlowStageTransitionFilterDto,
  OrderFlowStageTransitionRequestDto,
} from '../../../Model/OrderFlowStageTransition';
import { UserResponseDto } from '../../../Model/UserResponseDto';
import { AGGridHelper } from '../../../Shared/Service/AGGridHelper';
import { AuthService } from '../../../Shared/Service/auth.service';
import { CommonHelper } from '../../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../../Shared/Service/http-helper.service';
import { OrderFlowFilterDto } from '../../../Model/OrderFlow';

@Component({
  selector: 'app-order-flow-stage-transition',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './order-flow-stage-transition.component.html',
  styleUrl: './order-flow-stage-transition.component.scss',
  providers: [DatePipe],
})
export class OrderFlowStageTransitionComponent implements OnInit {
  private orderflowstagetransitionGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public oOrderFlowStageFilterDto = new OrderFlowStageFilterDto();
  public oOrderFlowStageTransitionFilterDto =
    new OrderFlowStageTransitionFilterDto();
  public oOrderFlowStageTransitionRequestDto =
    new OrderFlowStageTransitionRequestDto();
  public oCurrentUser = new UserResponseDto();

  public orderFlowStageList: any[] = [];
  public orderFlowList: any[] = [];

  public oOrderFlowFilterDto = new OrderFlowFilterDto();
  public orderflowstagetransitionId = 0;
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
  trackByOrderFlowTo: TrackByFunction<any> | any;
  trackByFnFromOrderFlowStage: TrackByFunction<any> | any;
  trackByFnToOrderFlowStage: TrackByFunction<any> | any;
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
    this.GetAllOrderFlowStages();
    this.GetOrderFlowStageTransition();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetOrderFlowStageTransition();
  }

  onGridReadyTransection(params: any) {
    this.orderflowstagetransitionGridApi = params.api;
    this.rowData = [];
  }

  Filter() {
    this.GetOrderFlowStageTransition();
  }

  private GetOrderFlowStageTransition() {
    this.oOrderFlowStageTransitionFilterDto.flowId =
      Number(this.oOrderFlowStageTransitionFilterDto.flowId) || 0;
    this.oOrderFlowStageTransitionFilterDto.fromStageId =
      Number(this.oOrderFlowStageTransitionFilterDto.fromStageId) || 0;
    this.oOrderFlowStageTransitionFilterDto.isAllowed =
      CommonHelper.booleanConvert(
        this.oOrderFlowStageTransitionFilterDto.isAllowed,
      );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlowStageTransition/GetOrderFlowStageTransition?pageNumber=${this.pageIndex}`,
        this.oOrderFlowStageTransitionFilterDto,
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

  private GetAllOrderFlowStages() {
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
        `OrderFlowStage/GetAllOrderFlowStages`,
        this.oOrderFlowStageFilterDto,
      )
      .subscribe(
        (res: any) => {
          this.orderFlowStageList = res;
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

  public InsertOrderFlowStageTransition() {
    if (this.oOrderFlowStageTransitionRequestDto.flowId == 0) {
      this.toast.warning('Please enter flow', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    if (this.oOrderFlowStageTransitionRequestDto.fromStageId == 0) {
      this.toast.warning('Please enter from stage', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    if (this.oOrderFlowStageTransitionRequestDto.toStageId == 0) {
      this.toast.warning('Please enter to stage', 'Warning!!', {
        progressBar: true,
      });
      return;
    }

    this.oOrderFlowStageTransitionRequestDto.flowId = Number(
      this.oOrderFlowStageTransitionRequestDto.flowId,
    );
    this.oOrderFlowStageTransitionRequestDto.fromStageId = Number(
      this.oOrderFlowStageTransitionRequestDto.fromStageId,
    );
    this.oOrderFlowStageTransitionRequestDto.toStageId = Number(
      this.oOrderFlowStageTransitionRequestDto.toStageId,
    );
    this.oOrderFlowStageTransitionRequestDto.isAllowed =
      CommonHelper.booleanConvert(
        this.oOrderFlowStageTransitionRequestDto.isAllowed,
      );

    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlowStageTransition/InsertOrderFlowStageTransition`,
        this.oOrderFlowStageTransitionRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetOrderFlowStageTransition();
          this.toast.success('Data Save Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public UpdateOrderFlowStageTransition() {
    if (this.oOrderFlowStageTransitionRequestDto.flowId == 0) {
      this.toast.warning('Please enter flow', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    if (this.oOrderFlowStageTransitionRequestDto.fromStageId == 0) {
      this.toast.warning('Please enter from stage', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    if (this.oOrderFlowStageTransitionRequestDto.toStageId == 0) {
      this.toast.warning('Please enter to stage', 'Warning!!', {
        progressBar: true,
      });
      return;
    }

    this.oOrderFlowStageTransitionRequestDto.flowId = Number(
      this.oOrderFlowStageTransitionRequestDto.flowId,
    );
    this.oOrderFlowStageTransitionRequestDto.fromStageId = Number(
      this.oOrderFlowStageTransitionRequestDto.fromStageId,
    );
    this.oOrderFlowStageTransitionRequestDto.toStageId = Number(
      this.oOrderFlowStageTransitionRequestDto.toStageId,
    );
    this.oOrderFlowStageTransitionRequestDto.isAllowed =
      CommonHelper.booleanConvert(
        this.oOrderFlowStageTransitionRequestDto.isAllowed,
      );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlowStageTransition/UpdateOrderFlowStageTransition/${this.orderflowstagetransitionId}`,
        this.oOrderFlowStageTransitionRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonModel');
          this.GetOrderFlowStageTransition();
          this.toast.success('Data Update Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  public DeleteOrderFlowStageTransition() {
    this.oOrderFlowStageTransitionRequestDto.flowId = Number(
      this.oOrderFlowStageTransitionRequestDto.flowId,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `OrderFlowStageTransition/DeleteOrderFlowStageTransition/${this.orderflowstagetransitionId}`,
        this.oOrderFlowStageTransitionRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonDelete');
          this.GetOrderFlowStageTransition();
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
    this.oOrderFlowStageTransitionRequestDto =
      new OrderFlowStageTransitionRequestDto();
    this.orderflowstagetransitionId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(
      this.orderflowstagetransitionGridApi,
    );
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.orderflowstagetransitionId = Number(getSelectedItem.id);
    this.oOrderFlowStageTransitionRequestDto.flowId = Number(
      getSelectedItem.flowId,
    );
    this.oOrderFlowStageTransitionRequestDto.fromStageId = Number(
      getSelectedItem.fromStageId,
    );
    this.oOrderFlowStageTransitionRequestDto.toStageId = Number(
      getSelectedItem.toStageId,
    );

    this.oOrderFlowStageTransitionRequestDto.isAllowed =
      CommonHelper.booleanConvert(getSelectedItem.isAllowed);
    this.oOrderFlowStageTransitionRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick('openCommonModel');
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(
      this.orderflowstagetransitionGridApi,
    );
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.orderflowstagetransitionId = Number(getSelectedItem.id);
    this.oOrderFlowStageTransitionRequestDto = getSelectedItem;
    CommonHelper.CommonButtonClick('openCommonDelete');
  }
}
