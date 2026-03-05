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
import { TruncatePipe } from '../../Shared/Pipe/truncate.pipe';
import { CartRequestDto } from '../../Model/Cart';
import { CartService } from '../../Shared/Service/cart.service';
import { NzSliderModule } from 'ng-zorro-antd/slider';
@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSliderModule,
    PaginationComponent,
    TruncatePipe,
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss',
  providers: [DatePipe],
})
export class ProductCategoryComponent implements OnInit {
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

  public oCartRequestDto = new CartRequestDto();

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

  value1 = 30;
  value2 = [20, 50];

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private cartService: CartService,
    private router: Router,
    private datePipe: DatePipe,
  ) {
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
    eDiv.innerHTML =
      ' <button class="btn btn-success p-0 px-1"> <i class="bi bi-eye-fill"></i> Detail</button>';
    eDiv.addEventListener('click', () => {
      this.router.navigateByUrl('transactions/' + params.data.transactionId);
    });
    return eDiv;
  }

  Filter() {
    this.GetProduct();
  }

  private GetProduct() {
    this.oProductFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oProductFilterDto.categoryId = Number(
      this.oProductFilterDto.categoryId,
    );
    this.oProductFilterDto.subCategoryId = Number(
      this.oProductFilterDto.subCategoryId,
    );
    this.oProductFilterDto.measurementUnitId = Number(
      this.oProductFilterDto.measurementUnitId,
    );
    this.oProductFilterDto.packTypeId = Number(
      this.oProductFilterDto.packTypeId,
    );
    this.oProductFilterDto.isActive = CommonHelper.booleanConvert(
      this.oProductFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `Product/GetProduct?pageNumber=${this.pageIndex}`,
        this.oProductFilterDto,
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.productList = res.items;
          this.pageIndex = res.pageIndex;
          this.totalPages = res.totalPages;
          this.totalRecords = res.totalRecords;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
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
    this.oCategoryFilterRequestDto.companyId =
      Number(CommonHelper.GetComapyId()) || 0;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCategoryFilterRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto)
      .subscribe(
        (res: any) => {
          this.categoryList = res;
          this.GetAllSubCategories();
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  private GetAllSubCategories() {
    this.oCategoryFilterRequestDto.parentId =
      Number(this.oProductFilterDto.categoryId) || 0;
    this.oCategoryFilterRequestDto.companyId =
      Number(CommonHelper.GetComapyId()) || 0;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCategoryFilterRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto)
      .subscribe(
        (res: any) => {
          this.subCategoryList = res;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  private GetAllSubCategoriesFrom() {
    this.oCategoryFilterRequestDto.parentId =
      Number(this.oProductRequestDto.categoryId) || 0;
    this.oCategoryFilterRequestDto.companyId =
      Number(CommonHelper.GetComapyId()) || 0;
    this.oCategoryFilterRequestDto.isActive = true;
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto)
      .subscribe(
        (res: any) => {
          this.subCategoryFromList = res;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  private GetAllPackTypes() {
    this.oPackTypeFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oPackTypeFilterDto.isActive = CommonHelper.booleanConvert(
      this.oPackTypeFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`PackType/GetAllPackTypes`, this.oPackTypeFilterDto)
      .subscribe(
        (res: any) => {
          this.packTypeList = res;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }
  private GetAllMeasurementUnits() {
    this.oMeasurementUnitFilterDto.companyId = Number(
      CommonHelper.GetComapyId(),
    );
    this.oMeasurementUnitFilterDto.isActive = CommonHelper.booleanConvert(
      this.oMeasurementUnitFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `MeasurementUnit/GetAllMeasurementUnits`,
        this.oMeasurementUnitFilterDto,
      )
      .subscribe(
        (res: any) => {
          this.measurementUnitList = res;
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
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
        },
      );
    }
  }

  public GetImageUrl(fileId: number): string {
    return `${this.http.appUrl}UploadedFile/GetImage/${fileId}`;
  }

  public AddToCart(product: any): void {
    // Logic to add the product to the cart
    this.oCartRequestDto = new CartRequestDto();
    this.oCartRequestDto.guestId = this.cartService.getOrCreateGuestId();
    this.oCartRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oCartRequestDto.productId = product.id;
    this.oCartRequestDto.quantity = 1;
    this.oCartRequestDto.actionType = 1;
    this.http.Post('Cart/InsertCart', this.oCartRequestDto).subscribe(
      (res) => {
        this.cartService.notifyCartUpdated(); // Notify cart update
      },
      (err) => {
        this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
      },
    );
  }
}
