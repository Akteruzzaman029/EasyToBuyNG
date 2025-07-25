import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { PaginationComponent } from '../../Shared/pagination/pagination.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductFilterDto, ProductRequestDto } from '../../Model/Product';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { PackTypeFilterDto } from '../../Model/PackType';
import { MeasurementUnitFilterDto } from '../../Model/MeasurementUnit';
import { CategoryFilterRequestDto } from '../../Model/Category';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular, PaginationComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [DatePipe]
})
export class ProductComponent implements OnInit {

  private productGridApi!: any;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData!: any[];
  public productList: any[] = [];

  public categoryList: any[] = [];
  public categoryFromList: any[] = [];
  public subCategoryList: any[] = [];
  public subCategoryFromList: any[] = [];
  public measurementUnitList: any[] = [];
  public packTypeList: any[] = [];

  public oPackTypeFilterDto = new PackTypeFilterDto();
  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();
  public oMeasurementUnitFilterDto = new MeasurementUnitFilterDto();
  public oProductFilterDto = new ProductFilterDto();
  public oProductRequestDto = new ProductRequestDto();
  public oCurrentUser = new UserResponseDto();

  public productId = 0;
  // pagination setup
  public pageIndex: number = 1;
  public totalRecords: number = 0;
  public totalPages: number = 0;


  public colDefsTransection: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 90, editable: false, checkboxSelection: false },
    { field: 'categoryName', width: 150, headerName: 'Category', filter: true },
    { field: 'subCategoryName', width: 150, headerName: 'Sub Category', filter: true },
    { field: 'measurementUnitName', width: 150, headerName: 'Measurement Unit', filter: true },
    { field: 'packTypeName', width: 150, headerName: 'Pack Type', filter: true },
    { field: 'name', width: 150, headerName: 'Product Name', filter: true },
    { field: 'modelNo', width: 150, headerName: 'Model No', filter: true },
    { field: 'purchasePrice', width: 150, headerName: 'Purchase Price', filter: true },
    { field: 'vat', width: 150, headerName: 'VAT', filter: true },
    { field: 'shortName', width: 150, headerName: 'Short Name', filter: true },
    { field: 'description', width: 150, headerName: 'Description', filter: true },
    { field: 'isConsider', width: 150, headerName: 'Is Consider', filter: true },
    { field: 'isBarCode', width: 150, headerName: 'Is Bar Code', filter: true },
    { field: 'fileId', width: 150, headerName: 'File ID', filter: true },
    { field: 'stock', width: 150, headerName: 'Stock', filter: true },
    { field: 'isFixedAmount', width: 150, headerName: 'Is Fixed Amount', filter: true },
    { field: 'discount', width: 150, headerName: 'Discount', filter: true },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByProduct: TrackByFunction<any> | any;

  trackByCategory: TrackByFunction<any> | any;
  trackByCategoryFrom: TrackByFunction<any> | any;
  trackBySubCategory: TrackByFunction<any> | any;
  trackBySubCategoryFrom: TrackByFunction<any> | any;
  trackByPackType: TrackByFunction<any> | any;
  trackByPackTypeFrom: TrackByFunction<any> | any;
  trackByMeasurementUnit: TrackByFunction<any> | any;
  trackByMeasurementUnitFrom: TrackByFunction<any> | any;
  trackByProductFrom: TrackByFunction<any> | any;

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe) {
    this.oCurrentUser = CommonHelper.GetUser();
  }


  ngOnInit(): void {
    this.GetAllCategories();
    this.GetAllPackTypes();
    this.GetAllMeasurementUnits();
    this.GetProduct();
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetProduct();
  }

  onGridReadyTransection(params: any) {
    this.productGridApi = params.api;
    this.rowData = [];
  }

  detailToGrid(params: any) {
    const eDiv = document.createElement('div');
    eDiv.innerHTML = ' <button class="btn btn-success p-0 px-1"> <i class="bi bi-eye-fill"></i> Detail</button>'
    eDiv.addEventListener('click', () => {
      this.router.navigateByUrl('transactions/' + params.data.transactionId)
    });
    return eDiv;
  }

  Filter() {
    this.GetProduct();
  }

  private GetProduct() {
    this.oProductFilterDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oProductFilterDto.categoryId = Number(this.oProductFilterDto.categoryId);
    this.oProductFilterDto.subCategoryId = Number(this.oProductFilterDto.subCategoryId);
    this.oProductFilterDto.measurementUnitId = Number(this.oProductFilterDto.measurementUnitId);
    this.oProductFilterDto.packTypeId = Number(this.oProductFilterDto.packTypeId);
    this.oProductFilterDto.isActive = CommonHelper.booleanConvert(this.oProductFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Product/GetProduct?pageNumber=${this.pageIndex}`, this.oProductFilterDto).subscribe(
      (res: any) => {
        console.log(res);
        this.rowData = res.items;
        this.pageIndex = res.pageIndex;
        this.totalPages = res.totalPages;
        this.totalRecords = res.totalRecords;
        // this.productGridApi.sizeColumnsToFit();
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }


  public onCategoryChangeFrom(event: any) {
    this.subCategoryFromList = [];
    this.GetAllSubCategoriesFrom();
  }

  public onCategoryChange(event: any) {
    this.oProductFilterDto.categoryId = Number(event.target.value);
    this.subCategoryList = [];
    this.GetAllSubCategories();
  }

  private GetAllCategories() {
    this.oCategoryFilterRequestDto.parentId = 0;
    this.oCategoryFilterRequestDto.companyId = Number(this.oCurrentUser?.companyId) || 0;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(this.oCategoryFilterRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto).subscribe(
      (res: any) => {
        this.categoryList = res;
        this.GetAllSubCategories();
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  private GetAllSubCategories() {
    this.oCategoryFilterRequestDto.parentId = Number(this.oProductFilterDto.categoryId) || 0;
    this.oCategoryFilterRequestDto.companyId = Number(this.oCurrentUser?.companyId) || 0;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(this.oCategoryFilterRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto).subscribe(
      (res: any) => {
        this.subCategoryList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  private GetAllSubCategoriesFrom() {
    this.oCategoryFilterRequestDto.parentId = Number(this.oProductRequestDto.categoryId) || 0;
    this.oCategoryFilterRequestDto.companyId = Number(this.oCurrentUser?.companyId) || 0;
    this.oCategoryFilterRequestDto.isActive = true;
    // After the hash is generated, proceed with the API call
    this.http.Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto).subscribe(
      (res: any) => {
        this.subCategoryFromList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }

  private GetAllPackTypes() {
    this.oPackTypeFilterDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oPackTypeFilterDto.isActive = CommonHelper.booleanConvert(this.oPackTypeFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`PackType/GetAllPackTypes`, this.oPackTypeFilterDto).subscribe(
      (res: any) => {
        this.packTypeList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  private GetAllMeasurementUnits() {
    this.oMeasurementUnitFilterDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oMeasurementUnitFilterDto.isActive = CommonHelper.booleanConvert(this.oMeasurementUnitFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`MeasurementUnit/GetAllMeasurementUnits`, this.oMeasurementUnitFilterDto).subscribe(
      (res: any) => {
        this.measurementUnitList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }


  public onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.http.UploadFile(`UploadedFile/Upload`, file).subscribe(
        (res: any) => {
          this.oProductRequestDto.fileId = res.id;
        },
        (err) => {
          console.log(err.ErrorMessage);
        }
      );
    }

  }

  public InsertProduct() {

    if (this.oProductRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oProductRequestDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oProductRequestDto.categoryId = Number(this.oProductRequestDto.categoryId);
    this.oProductRequestDto.subCategoryId = Number(this.oProductRequestDto.subCategoryId);
    this.oProductRequestDto.measurementUnitId = Number(this.oProductRequestDto.measurementUnitId);
    this.oProductRequestDto.packTypeId = Number(this.oProductRequestDto.packTypeId);
    this.oProductRequestDto.discount = Number(this.oProductRequestDto.discount);
    this.oProductRequestDto.vat = Number(this.oProductRequestDto.vat);
    this.oProductRequestDto.purchasePrice = Number(this.oProductRequestDto.purchasePrice);
    this.oProductRequestDto.fileId = Number(this.oProductRequestDto.fileId);
    this.oProductRequestDto.stock = Number(this.oProductRequestDto.stock);
    this.oProductRequestDto.isConsider = CommonHelper.booleanConvert(this.oProductRequestDto.isConsider);
    this.oProductRequestDto.isBarCode = CommonHelper.booleanConvert(this.oProductRequestDto.isBarCode);
    this.oProductRequestDto.isFixedAmount = CommonHelper.booleanConvert(this.oProductRequestDto.isFixedAmount);
    this.oProductRequestDto.isActive = CommonHelper.booleanConvert(this.oProductRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Product/InsertProduct`, this.oProductRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetProduct();
        this.toast.success("Data Save Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }

  public UpdateProduct() {

    if (this.oProductRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oProductRequestDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oProductRequestDto.categoryId = Number(this.oProductRequestDto.categoryId);
    this.oProductRequestDto.subCategoryId = Number(this.oProductRequestDto.subCategoryId);
    this.oProductRequestDto.measurementUnitId = Number(this.oProductRequestDto.measurementUnitId);
    this.oProductRequestDto.packTypeId = Number(this.oProductRequestDto.packTypeId);
    this.oProductRequestDto.discount = Number(this.oProductRequestDto.discount);
    this.oProductRequestDto.vat = Number(this.oProductRequestDto.vat);
    this.oProductRequestDto.purchasePrice = Number(this.oProductRequestDto.purchasePrice);
    this.oProductRequestDto.fileId = Number(this.oProductRequestDto.fileId);
    this.oProductRequestDto.stock = Number(this.oProductRequestDto.stock);
    this.oProductRequestDto.isConsider = CommonHelper.booleanConvert(this.oProductRequestDto.isConsider);
    this.oProductRequestDto.isBarCode = CommonHelper.booleanConvert(this.oProductRequestDto.isBarCode);
    this.oProductRequestDto.isFixedAmount = CommonHelper.booleanConvert(this.oProductRequestDto.isFixedAmount);
    this.oProductRequestDto.isActive = CommonHelper.booleanConvert(this.oProductRequestDto.isActive);

    this.oProductRequestDto.userId = (this.oCurrentUser?.userId);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Product/UpdateProduct/${this.productId}`, this.oProductRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonModel");
        this.GetProduct();
        this.toast.success("Data Update Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  public DeleteProduct() {
    this.oProductRequestDto.isActive = CommonHelper.booleanConvert(this.oProductRequestDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Product/DeleteProduct/${this.productId}`, this.oProductRequestDto).subscribe(
      (res: any) => {
        CommonHelper.CommonButtonClick("closeCommonDelete");
        this.GetProduct();
        this.toast.success("Data Delete Successfully!!", "Success!!", { progressBar: true });
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }
  add() {
    CommonHelper.CommonButtonClick("openCommonModel");
    this.oProductRequestDto = new ProductRequestDto();
    this.productId = 0;
  }

  edit() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.productGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.productId = Number(getSelectedItem.id);
    this.oProductRequestDto.name = getSelectedItem.name;
    this.oProductRequestDto.shortName = getSelectedItem.shortName;
    this.oProductRequestDto.modelNo = getSelectedItem.modelNo;
    this.oProductRequestDto.description = getSelectedItem.description;
    this.oProductRequestDto.categoryId = Number(getSelectedItem.categoryId);
    this.oProductRequestDto.subCategoryId = Number(getSelectedItem.subCategoryId);
    this.oProductRequestDto.measurementUnitId = Number(getSelectedItem.measurementUnitId);
    this.oProductRequestDto.packTypeId = Number(getSelectedItem.packTypeId);
    this.oProductRequestDto.purchasePrice = Number(getSelectedItem.purchasePrice);
    this.oProductRequestDto.vat = Number(getSelectedItem.vat);
    this.oProductRequestDto.fileId = Number(getSelectedItem.fileId);
    this.oProductRequestDto.stock = Number(getSelectedItem.stock);
    this.oProductRequestDto.discount = Number(getSelectedItem.discount);
    this.oProductRequestDto.isConsider = CommonHelper.booleanConvert(getSelectedItem.isConsider);
    this.oProductRequestDto.isBarCode = CommonHelper.booleanConvert(getSelectedItem.isBarCode);
    this.oProductRequestDto.isFixedAmount = CommonHelper.booleanConvert(getSelectedItem.isFixedAmount);
    this.oProductRequestDto.isActive = CommonHelper.booleanConvert(getSelectedItem.isActive);
    this.oProductRequestDto.remarks = getSelectedItem.remarks;
    this.oProductRequestDto.userId = (this.oCurrentUser?.userId);
    this.GetAllSubCategoriesFrom();
    CommonHelper.CommonButtonClick("openCommonModel");
  }

  delete() {
    let getSelectedItem = AGGridHelper.GetSelectedRow(this.productGridApi);
    if (getSelectedItem == null) {
      this.toast.warning("Please select an item", "Warning!!", { progressBar: true })
    }
    this.productId = Number(getSelectedItem.id);
    this.oProductRequestDto.name = getSelectedItem.name;
    this.oProductRequestDto.shortName = getSelectedItem.shortName;
    this.oProductRequestDto.modelNo = getSelectedItem.modelNo;
    this.oProductRequestDto.description = getSelectedItem.description;
    this.oProductRequestDto.categoryId = Number(getSelectedItem.categoryId);
    this.oProductRequestDto.categoryId = Number(getSelectedItem.categoryId);
    this.oProductRequestDto.subCategoryId = Number(getSelectedItem.subCategoryId);
    this.oProductRequestDto.measurementUnitId = Number(getSelectedItem.measurementUnitId);
    this.oProductRequestDto.packTypeId = Number(getSelectedItem.packTypeId);
    this.oProductRequestDto.purchasePrice = Number(getSelectedItem.purchasePrice);
    this.oProductRequestDto.vat = Number(getSelectedItem.vat);
    this.oProductRequestDto.fileId = Number(getSelectedItem.fileId);
    this.oProductRequestDto.stock = Number(getSelectedItem.stock);
    this.oProductRequestDto.discount = Number(getSelectedItem.discount);
    this.oProductRequestDto.isConsider = CommonHelper.booleanConvert(getSelectedItem.isConsider);
    this.oProductRequestDto.isBarCode = CommonHelper.booleanConvert(getSelectedItem.isBarCode);
    this.oProductRequestDto.isFixedAmount = CommonHelper.booleanConvert(getSelectedItem.isFixedAmount);
    this.oProductRequestDto.isActive = CommonHelper.booleanConvert(getSelectedItem.isActive);
    this.oProductRequestDto.remarks = getSelectedItem.remarks;
    CommonHelper.CommonButtonClick("openCommonDelete");

  }


}

