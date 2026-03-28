import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CustomCategoryFilterDto,
  CustomCategoryRequestDto,
} from '../../Model/CustomCategory';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { PaginationComponent } from '../../Shared/pagination/pagination.component';
import { CategoryFilterRequestDto } from '../../Model/Category';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CustomCategoryConfigFilterDto } from '../../Model/CustomCategoryConfig';

function dig(path = '0', level = 3): NzTreeNodeOptions[] {
  const list: NzTreeNodeOptions[] = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode: NzTreeNodeOptions = {
      title: key,
      key,
      expanded: true,
      children: [],
      isLeaf: false,
    };

    if (level > 0) {
      treeNode.children = dig(key, level - 1);
    } else {
      treeNode.isLeaf = true;
    }

    list.push(treeNode);
  }
  return list;
}

@Component({
  selector: 'app-custom-customcategory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AgGridAngular,
    PaginationComponent,
    NzTreeSelectModule,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: './custom-category.component.html',
  styleUrl: './custom-category.component.scss',
})
export class CustomCategoryComponent implements OnInit {
  private customcategoryGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public customCategoryConfigList: any[] = [];
  public oCustomCategoryFilterDto = new CustomCategoryFilterDto();
  public oCustomCategoryRequestDto = new CustomCategoryRequestDto();
  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();
  public oCustomCategoryConfigFilterDto = new CustomCategoryConfigFilterDto();
  public customcategoryId = 0;
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
      headerName: 'Custom Category Name',
      filter: true,
    },
    {
      field: 'typeTag',
      width: 150,
      headerName: 'Type Tag',
      filter: true,
    },
    {
      field: 'categoryName',
      width: 150,
      headerName: 'Category Name',
      filter: true,
    },
    { field: 'sequenceNo', headerName: 'SLNo' },
    { field: 'isActive', headerName: 'Status' },
    { field: 'remarks', headerName: 'Remarks' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByCustomCategory: TrackByFunction<any> | any;
  trackByCustomCategoryConfigFrom: TrackByFunction<any> | any;

  nodes: NzTreeNodeOptions[] = [];
  isVisibleModal = false;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.GetAllCustomCategoryConfigs();
    this.GetCategoryTree();
    this.GetCustomCategory();
  }

  get modalTitle(): string {
    return ` Custom Category ${this.customcategoryId === 0 ? 'Create' : 'Update'}`;
  }

  handleCancel(): void {
    this.isVisibleModal = false;
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetCustomCategory();
  }

  onGridReadyTransection(params: any) {
    this.customcategoryGridApi = params.api;
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
    this.GetCustomCategory();
  }

  private GetCustomCategory() {
    let currentUser = CommonHelper.GetUser();
    this.oCustomCategoryFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oCustomCategoryFilterDto.categoryId = Number(
      this.oCustomCategoryFilterDto.categoryId,
    );
    this.oCustomCategoryFilterDto.customCategoryConfigId = Number(
      this.oCustomCategoryFilterDto.customCategoryConfigId,
    );
    this.oCustomCategoryFilterDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategory/GetCustomCategory?pageNumber=${this.pageIndex}`,
        this.oCustomCategoryFilterDto,
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
          this.customcategoryGridApi.sizeColumnsToFit();
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  private GetCategoryTree() {
    let currentUser = CommonHelper.GetUser();
    this.oCategoryFilterRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oCategoryFilterRequestDto.parentId = -1;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCategoryFilterRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Category/GetCategoryTree`, this.oCategoryFilterRequestDto)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.nodes = CommonHelper.mapFlatToTreeNodes(res);
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  private GetAllCustomCategoryConfigs() {
    this.oCustomCategoryConfigFilterDto.companyId = Number(
      CommonHelper.GetComapyId()
    );
    this.oCustomCategoryConfigFilterDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryConfigFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategoryConfig/GetAllCustomCategoryConfigs`,
        this.oCustomCategoryConfigFilterDto,
      )
      .subscribe(
        (res: any) => {
          this.customCategoryConfigList = res;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public InsertCustomCategory() {
    if (this.oCustomCategoryRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    let currentUser = CommonHelper.GetUser();
    this.oCustomCategoryRequestDto.companyId = Number(currentUser.companyId);
    this.oCustomCategoryRequestDto.fileId = Number(
      this.oCustomCategoryRequestDto.fileId,
    );
    this.oCustomCategoryRequestDto.categoryId = Number(
      this.oCustomCategoryRequestDto.categoryId,
    );
    this.oCustomCategoryRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategory/InsertCustomCategory`,
        this.oCustomCategoryRequestDto,
      )
      .subscribe(
        (res: any) => {
          this.isVisibleModal = false;
          this.GetCustomCategory();
          this.toast.success('Data Save Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  public UpdateCustomCategory() {
    if (this.oCustomCategoryRequestDto.name == '') {
      this.toast.warning('Please enter name', 'Warning!!', {
        progressBar: true,
      });
      return;
    }
    let currentUser = CommonHelper.GetUser();
    this.oCustomCategoryRequestDto.companyId = Number(currentUser.companyId);
    this.oCustomCategoryRequestDto.categoryId = Number(
      this.oCustomCategoryRequestDto.categoryId,
    );
    this.oCustomCategoryRequestDto.fileId = Number(
      this.oCustomCategoryRequestDto.fileId,
    );
    this.oCustomCategoryRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategory/UpdateCustomCategory/${this.customcategoryId}`,
        this.oCustomCategoryRequestDto,
      )
      .subscribe(
        (res: any) => {
          this.isVisibleModal = false;
          this.GetCustomCategory();
          this.toast.success('Data Update Successfully!!', 'Success!!', {
            progressBar: true,
          });
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  public DeleteCustomCategory() {
    this.oCustomCategoryRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategory/DeleteCustomCategory/${this.customcategoryId}`,
        this.oCustomCategoryRequestDto,
      )
      .subscribe(
        (res: any) => {
          CommonHelper.CommonButtonClick('closeCommonDelete');
          this.GetCustomCategory();
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
    this.oCustomCategoryRequestDto = new CustomCategoryRequestDto();
    this.customcategoryId = 0;
    this.isVisibleModal = true;
  }

  edit() {
    this.oCustomCategoryRequestDto = new CustomCategoryRequestDto();
    let getSelectedItem = AGGridHelper.GetSelectedRow(
      this.customcategoryGridApi,
    );
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.customcategoryId = Number(getSelectedItem.id);
    this.oCustomCategoryRequestDto.name = getSelectedItem.name;
    this.oCustomCategoryRequestDto.customCategoryConfigId = Number(
      getSelectedItem.customCategoryConfigId,
    );
    this.oCustomCategoryRequestDto.fileId = Number(getSelectedItem.fileId);
    this.oCustomCategoryRequestDto.categoryId = Number(
      getSelectedItem.categoryId,
    );
    this.oCustomCategoryRequestDto.sequenceNo = Number(
      getSelectedItem.sequenceNo,
    );
    this.oCustomCategoryRequestDto.isActive = CommonHelper.booleanConvert(
      getSelectedItem.isActive,
    );
    this.oCustomCategoryRequestDto.remarks = getSelectedItem.remarks;
    this.isVisibleModal = true;
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(
      this.customcategoryGridApi,
    );
    if (getSelectedItem == null) {
      this.toast.warning('Please select an item', 'Warning!!', {
        progressBar: true,
      });
    }
    this.customcategoryId = Number(getSelectedItem.id);
    this.oCustomCategoryRequestDto.name = getSelectedItem.name;
    this.oCustomCategoryRequestDto.categoryId = Number(
      getSelectedItem.categoryId,
    );
    this.oCustomCategoryRequestDto.fileId = Number(getSelectedItem.fileId);
    this.oCustomCategoryRequestDto.sequenceNo = Number(
      getSelectedItem.sequenceNo,
    );
    this.oCustomCategoryRequestDto.isActive = getSelectedItem.isActive;
    this.oCustomCategoryRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick('openCommonDelete');
  }

  public GetImageUrl(fileId: number): string {
    return `${this.http.appUrl}UploadedFile/GetImage/${fileId}`;
  }

  public onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.http.UploadFile(`UploadedFile/Upload`, file).subscribe(
        (res: any) => {
          this.oCustomCategoryRequestDto.fileId = res.id;
        },
        (err) => {
          console.log(err.ErrorMessage);
        },
      );
    }
  }

  public onPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.pageIndex--;
      this.GetCustomCategory();
    }
  }

  public onPage(pageNumber: number): void {
    if (this.hasNextPage) {
      this.pageIndex = pageNumber;
      this.GetCustomCategory();
    }
  }

  public onNextPage(): void {
    if (this.hasNextPage) {
      this.pageIndex++;
      this.GetCustomCategory();
    }
  }
}
