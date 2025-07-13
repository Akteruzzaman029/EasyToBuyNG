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
    { field: 'name', width: 150, headerName: 'Product Name', filter: true },
    { field: 'subProductName', width: 150, headerName: 'Sub Product Name', filter: true },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'isActive', headerName: 'Status' },
  ];
  trackByFn: TrackByFunction<any> | any;
  trackByProduct: TrackByFunction<any> | any;
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
    this.GetProducts();
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
        this.productGridApi.sizeColumnsToFit();
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }

  private GetProducts() {
    this.oProductFilterDto.categoryId = 0;
    this.oProductFilterDto.isActive = CommonHelper.booleanConvert(this.oProductFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Get(`Product/GetAllCategories/${0}`).subscribe(
      (res: any) => {
        this.productList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }


  public InsertProduct() {

    if (this.oProductRequestDto.name == "") {
      this.toast.warning("Please enter name", "Warning!!", { progressBar: true });
      return;
    }

    this.oProductFilterDto.categoryId = Number(this.oCurrentUser?.companyId);
    this.oProductFilterDto.categoryId = Number(this.oProductFilterDto.categoryId);
    this.oProductFilterDto.subCategoryId = Number(this.oProductFilterDto.subCategoryId);
    this.oProductFilterDto.measurementUnitId = Number(this.oProductFilterDto.measurementUnitId);
    this.oProductFilterDto.packTypeId = Number(this.oProductFilterDto.packTypeId);
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

    this.oProductFilterDto.categoryId = Number(this.oCurrentUser?.companyId);
    this.oProductFilterDto.categoryId = Number(this.oProductFilterDto.categoryId);
    this.oProductFilterDto.subCategoryId = Number(this.oProductFilterDto.subCategoryId);
    this.oProductFilterDto.measurementUnitId = Number(this.oProductFilterDto.measurementUnitId);
    this.oProductFilterDto.packTypeId = Number(this.oProductFilterDto.packTypeId);

    this.oProductRequestDto.isActive = CommonHelper.booleanConvert(this.oProductRequestDto.isActive);
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

