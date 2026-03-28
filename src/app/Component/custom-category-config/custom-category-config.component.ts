import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../Shared/pagination/pagination.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { CustomCategoryConfigFilterDto, CustomCategoryConfigRequestDto } from '../../Model/CustomCategoryConfig';
import { AuthService } from '../../Shared/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';

@Component({
  selector: 'app-custom-category-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AgGridAngular,
    PaginationComponent,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: './custom-category-config.component.html',
  styleUrl: './custom-category-config.component.scss',
})
export class CustomCategoryConfigComponent implements OnInit {
  private customcategoryconfigGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public customcategoryconfigList: any[] = [];
  public oCustomCategoryConfigFilterDto = new CustomCategoryConfigFilterDto();
  public oCustomCategoryConfigRequestDto = new CustomCategoryConfigRequestDto();
  public customcategoryconfigId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;
  public hasPreviousPage: boolean = false;
  public hasNextPage: boolean = false;
  public totalPageNumbers: number[] = [];

  public colDefsTransection: any[] = [
    {
      valueGetter: 'node.rowIndex + 1',
      headerName: 'SL',
      width: 90,
      editable: false,
      checkboxSelection: false,
    },
    {
      field: 'name',
      width: 150,
      headerName: ' Name',
      filter: true,
    },
    {
      field: 'class',
      width: 150,
      headerName: 'Class',
      filter: true,
    },
    { field: 'sequenceNo', headerName: 'SLNo' },
    { field: 'isActive', headerName: 'Status' },
    { field: 'remarks', headerName: 'Remarks' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByCustomCategoryConfig: TrackByFunction<any> | any;
  trackByCustomCategoryConfigFrom: TrackByFunction<any> | any;

  isVisibleModal = false;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.GetCustomCategoryConfig();
  }

  get modalTitle(): string {
    return ` Custom Category ${this.customcategoryconfigId === 0 ? 'Create' : 'Update'}`;
  }

  handleCancel(): void {
    this.isVisibleModal = false;
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetCustomCategoryConfig();
  }

  onGridReadyTransection(params: any) {
    this.customcategoryconfigGridApi = params.api;
    this.rowData = [];
  }

  detailToGrid(params: any) {
    const eDiv = document.createElement('div');
    eDiv.innerHTML =
      ' <button class="btn btn-success p-0 px-1"> <i class="bi bi-eye-fill"></i> Detail</button>';
    eDiv.addEventListener('click', () => {
      this.router.navigateByUrl('transactions/' + params.data.transactionId);
    });
    return eDiv;
  }

  Filter() {
    this.GetCustomCategoryConfig();
  }

  private GetCustomCategoryConfig() {
    let currentUser = CommonHelper.GetUser();
    this.oCustomCategoryConfigFilterDto.companyId = Number(currentUser?.companyId);
    this.oCustomCategoryConfigFilterDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryConfigFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategoryConfig/GetCustomCategoryConfig?pageNumber=${this.pageIndex}`,
        this.oCustomCategoryConfigFilterDto,
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.rowData = res.items;
          this.pageIndex = res.pageIndex;
          this.totalPages = res.totalPages;
          this.totalRecords = res.totalRecords;
          this.hasPreviousPage = res.hasPreviousPage;
          this.hasNextPage = res.hasNextPage;
          this.totalPageNumbers = CommonHelper.generateNumbers(
            this.pageIndex,
            this.totalPages,
          );
          this.customcategoryconfigGridApi.sizeColumnsToFit();
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public InsertCustomCategoryConfig() {
    if (this.oCustomCategoryConfigRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    let currentUser = CommonHelper.GetUser();
    this.oCustomCategoryConfigRequestDto.companyId = Number(currentUser.companyId);
    this.oCustomCategoryConfigRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryConfigRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategoryConfig/InsertCustomCategoryConfig`,
        this.oCustomCategoryConfigRequestDto,
      )
      .subscribe(
        (res: any) => {
          this.isVisibleModal = false;
          this.GetCustomCategoryConfig();
          this.toast.success('Data Save Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public UpdateCustomCategoryConfig() {
    if (this.oCustomCategoryConfigRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    let currentUser = CommonHelper.GetUser();
    this.oCustomCategoryConfigRequestDto.companyId = Number(currentUser.companyId);
    this.oCustomCategoryConfigRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryConfigRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategoryConfig/UpdateCustomCategoryConfig/${this.customcategoryconfigId}`,
        this.oCustomCategoryConfigRequestDto,
      )
      .subscribe(
        (res: any) => {
          this.isVisibleModal = false;
          this.GetCustomCategoryConfig();
          this.toast.success('Data Update Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  public DeleteCustomCategoryConfig() {
    this.oCustomCategoryConfigRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryConfigRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategoryConfig/DeleteCustomCategoryConfig/${this.customcategoryconfigId}`,
        this.oCustomCategoryConfigRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonDelete');
          this.GetCustomCategoryConfig();
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
    this.oCustomCategoryConfigRequestDto = new CustomCategoryConfigRequestDto();
    this.customcategoryconfigId = 0;
    this.isVisibleModal = true;
  }

  edit() {
    this.oCustomCategoryConfigRequestDto = new CustomCategoryConfigRequestDto();
    let getSelectedItem = AGGridHelper.GetSelectedRow(
      this.customcategoryconfigGridApi,
    );
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.customcategoryconfigId = Number(getSelectedItem.id);
    this.oCustomCategoryConfigRequestDto.name = getSelectedItem.name;
    this.oCustomCategoryConfigRequestDto.class = getSelectedItem.class;
    this.oCustomCategoryConfigRequestDto.sequenceNo = Number(
      getSelectedItem.sequenceNo,
    );
    this.oCustomCategoryConfigRequestDto.isActive = CommonHelper.booleanConvert(
      getSelectedItem.isActive,
    );
    this.oCustomCategoryConfigRequestDto.remarks = getSelectedItem.remarks;
    this.isVisibleModal = true;
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(
      this.customcategoryconfigGridApi,
    );
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.customcategoryconfigId = Number(getSelectedItem.id);
    this.oCustomCategoryConfigRequestDto.name = getSelectedItem.name;
    this.oCustomCategoryConfigRequestDto.sequenceNo = Number(
      getSelectedItem.sequenceNo,
    );
    this.oCustomCategoryConfigRequestDto.isActive = getSelectedItem.isActive;
    this.oCustomCategoryConfigRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick('openCommonDelete');
  }

  public onPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.pageIndex--;
      this.GetCustomCategoryConfig();
    }
  }

  public onPage(pageNumber: number): void {
    if (this.hasNextPage) {
      this.pageIndex = pageNumber;
      this.GetCustomCategoryConfig();
    }
  }

  public onNextPage(): void {
    if (this.hasNextPage) {
      this.pageIndex++;
      this.GetCustomCategoryConfig();
    }
  }
}
