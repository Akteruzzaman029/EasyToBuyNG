import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  TrackByFunction,
} from '@angular/core';
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
import { CommonCategoryTreeComponent } from '../../Shared/common-category-tree/common-category-tree.component';
import { DebounceInputDirective } from '../../Shared/directives/debounce-input.directive';
import { BrandFilterDto } from '../../Model/Brand';
import { take } from 'rxjs';
import { loadBrands } from '../../store/Brand/brand.action';
import {
  selectBrandError,
  selectMappedBrands,
  selectShouldLoadBrands,
} from '../../store/Brand/brand.selector';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loadCategories } from '../../store/Category/category.action';
import {
  selectCategories,
  selectCategoryListError,
  selectShouldLoadCategories,
} from '../../store/Category/category.selector';
@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSliderModule,
    PaginationComponent,
    TruncatePipe,
    CommonCategoryTreeComponent,
    DebounceInputDirective,
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
  public brandList: any[] = [];
  public categoryFromList: any[] = [];
  public subCategoryList: any[] = [];
  public subCategoryFromList: any[] = [];
  public measurementUnitList: any[] = [];
  public packTypeList: any[] = [];

  filteredBrandList: any[] = [];
  selectedBrandIds: number[] = [];

  public oBrandFilterDto = new BrandFilterDto();
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
  brandSearchText = '';
  priceRange = [0, 50000];

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private cartService: CartService,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.oCurrentUser = CommonHelper.GetUser();
    this.priceRange = [
      this.oProductFilterDto.minPrice || 0,
      this.oProductFilterDto.maxPrice || 50000,
    ];
  }

  ngOnInit(): void {
    this.GetProduct();

    this.GetAllCategories();

    this.store
      .select(selectCategories)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.categoryList = res || [];
      });

    this.store
      .select(selectCategoryListError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((err) => {
        if (err) {
          this.toast.error(err, 'Error!!', { progressBar: true });
        }
      });

    this.GetAllBrands();

    this.store
      .select(selectMappedBrands)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.brandList = res || [];
        this.filteredBrandList = [...this.brandList];
      });

    this.store
      .select(selectBrandError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((err) => {
        if (err) {
          this.toast.error(err, 'Error!!', { progressBar: true });
        }
      });
  }

  PageChange(event: any) {
    this.pageIndex = Number(event);
    this.GetProduct();
  }

  onGridReadyTransection(params: any) {
    this.productGridApi = params.api;
    this.rowData = [];
  }

  onCategoryNodeClicked(node: any): void {
    console.log(node);
    if (node.parentId > 0) {
      this.oProductFilterDto.subCategoryId = Number(node.id);
      this.oProductFilterDto.categoryId = Number(node.parentId);
    } else {
      this.oProductFilterDto.categoryId = Number(node.id);
    }
    this.Filter();
  }

  onBrandSearch(): void {
    const search = this.brandSearchText.trim().toLowerCase();
    if (!search) {
      this.filteredBrandList = [...this.brandList];
      return;
    }
    this.filteredBrandList = this.brandList.filter((x) =>
      x.name.toLowerCase().includes(search),
    );
  }

  onBrandChecked(item: any): void {
    item.isChecked = !item.isChecked;
    this.selectedBrandIds = this.brandList
      .filter((x) => x.isChecked)
      .map((x) => x.id);
    this.oProductFilterDto.brandIds = this.selectedBrandIds.join(',');
    this.Filter();
  }

  onPriceRangeChange(value: number[]): void {
    this.priceRange = value;
    this.oProductFilterDto.minPrice = value[0] ?? 0;
    this.oProductFilterDto.maxPrice = value[1] ?? 0;
    this.Filter();
  }

  onSearchDebounce(event: any) {
    this.Filter();
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

    this.oProductFilterDto.minPrice = this.priceRange[0] ?? 0;
    this.oProductFilterDto.maxPrice = this.priceRange[1] ?? 0;
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
  }

  private GetAllCategories(): void {
    const filter = {
      ...this.oCategoryFilterRequestDto,
      parentId: 0,
      companyId: Number(CommonHelper.GetComapyId()) || 0,
      isActive: CommonHelper.booleanConvert(
        this.oCategoryFilterRequestDto.isActive,
      ),
    };

    this.oCategoryFilterRequestDto = filter;

    this.store
      .select(selectShouldLoadCategories(filter))
      .pipe(take(1))
      .subscribe((shouldLoad) => {
        if (shouldLoad) {
          this.store.dispatch(loadCategories({ filter }));
        }
      });
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

  // private GetAllBrands() {
  //   this.oPackTypeFilterDto.companyId = Number(CommonHelper.GetComapyId());
  //   this.oPackTypeFilterDto.isActive = CommonHelper.booleanConvert(
  //     this.oPackTypeFilterDto.isActive,
  //   );
  //   // After the hash is generated, proceed with the API call
  //   this.http.Post(`Brand/GetAllBrands`, this.oPackTypeFilterDto).subscribe(
  //     (res: any) => {
  //       this.brandList = res.map((x: any) => ({
  //         id: x.id,
  //         name: x.name,
  //         productCount: x.productCount,
  //         isChecked: false,
  //       }));
  //       this.filteredBrandList = [...this.brandList];
  //     },
  //     (err) => {
  //       this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
  //     },
  //   );
  // }

  private GetAllBrands(): void {
    const filter = {
      ...this.oPackTypeFilterDto,
      companyId: Number(CommonHelper.GetComapyId()),
      isActive: CommonHelper.booleanConvert(this.oPackTypeFilterDto.isActive),
    };
    this.oPackTypeFilterDto = filter;
    this.store
      .select(selectShouldLoadBrands(filter))
      .pipe(take(1))
      .subscribe((shouldLoad) => {
        if (shouldLoad) {
          this.store.dispatch(loadBrands({ filter }));
        }
      });
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

  public details(product: any) {
    this.router.navigateByUrl('details/' + product.id);
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
