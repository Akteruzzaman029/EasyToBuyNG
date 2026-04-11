import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductFilterDto } from '../../Model/Product';
import { ToastrService } from 'ngx-toastr';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { CartService } from '../../Shared/Service/cart.service';
import { CartRequestDto } from '../../Model/Cart';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { BannerCarouselComponent } from '../banner-carousel/banner-carousel.component';

import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  selectCategoryTree,
  selectCategoryTreeLoading,
  selectCategoryTreeError,
  selectShouldLoadCategoryTree,
} from '../../store/Category/category.selector';
import { take } from 'rxjs';
import { loadCategoryTree } from '../../store/Category/category.action';

import { loadCustomCategories } from '../../store/CustomCategory/custom-category.action';
import {
  selectCustomCategories,
  selectCustomCategoryError,
  selectShouldLoadCustomCategories,
} from '../../store/CustomCategory/custom-category.selector';
@Component({
  selector: 'app-easy-to-buy-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NzStepsModule,
    BannerCarouselComponent,
  ],
  templateUrl: './easy-to-buy-home.component.html',
  styleUrl: './easy-to-buy-home.component.scss',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'en-US' }],
})
export class EasyToBuyHomeComponent implements OnInit {
  public oProductFilterDto = new ProductFilterDto();
  public oCartRequestDto = new CartRequestDto();
  public oCurrentUser = new UserResponseDto();

  public productList: any[] = [];

  groupedCategories: any[] = [];
  nodes: any[] = [];
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  categoryTree$ = this.store.select(selectCategoryTree);
  loading$ = this.store.select(selectCategoryTreeLoading);
  error$ = this.store.select(selectCategoryTreeError);

  oCategoryFilterRequestDto: any = {
    companyId: 0,
    parentId: -1,
    isActive: true,
  };

  oCustomCategoryFilterDto: any = {
    companyId: 0,
    categoryId: -1,
    isActive: true,
  };

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private cartService: CartService,
  ) {
    this.oCurrentUser = CommonHelper.GetUser();
  }

  ngOnInit(): void {
    // Initialization logic can go here
    this.GetAllCustomCategories();
    this.store
      .select(selectCustomCategories)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.groupedCategories = this.groupByCustomConfig(res || []);
      });

    this.store
      .select(selectCustomCategoryError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((err) => {
        if (err) {
          this.toast.error(err, 'Error!!', { progressBar: true });
        }
      });

    // this.GetProduct();

    this.getCategoryTree();

    this.categoryTree$.subscribe((res) => {
      this.nodes = CommonHelper.buildMenu(res || []);
    });

    this.error$.subscribe((err) => {
      if (err) {
        this.toast.error(err, 'Error!!', { progressBar: true });
      }
    });
  }

  private getCategoryTree(): void {
    this.oCategoryFilterRequestDto = {
      ...this.oCategoryFilterRequestDto,
      companyId: Number(CommonHelper.GetComapyId()),
      parentId: -1,
      isActive: CommonHelper.booleanConvert(
        this.oCategoryFilterRequestDto.isActive,
      ),
    };

    this.store
      .select(selectShouldLoadCategoryTree(this.oCategoryFilterRequestDto))
      .pipe(take(1))
      .subscribe((shouldLoad) => {
        if (shouldLoad) {
          this.store.dispatch(
            loadCategoryTree({ filter: this.oCategoryFilterRequestDto }),
          );
        }
      });
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
    this.http.Post(`Product/GetAllProducts`, this.oProductFilterDto).subscribe(
      (res: any) => {
        this.productList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
      },
    );
  }

  private GetAllCustomCategories(): void {
    const filter = {
      ...this.oCustomCategoryFilterDto,
      companyId: Number(CommonHelper.GetComapyId()),
      categoryId: -1,
      isActive: CommonHelper.booleanConvert(
        this.oCustomCategoryFilterDto.isActive,
      ),
    };

    this.oCustomCategoryFilterDto = filter;

    this.store
      .select(selectShouldLoadCustomCategories(filter))
      .pipe(take(1))
      .subscribe((shouldLoad) => {
        if (shouldLoad) {
          this.store.dispatch(loadCustomCategories({ filter }));
        }
      });
  }

  groupByCustomConfig(data: any[]): any[] {
    const groupedMap = new Map<string, any[]>();

    data
      .filter((x) => x.isActive)
      .sort((a, b) => {
        const configSort = (a.configSLNo ?? 0) - (b.configSLNo ?? 0);
        if (configSort !== 0) return configSort;

        return (a.sequenceNo ?? 0) - (b.sequenceNo ?? 0);
      })
      .forEach((item) => {
        const key = `${item.customCategoryConfigId}_${item.customCategoryConfigName}`;

        if (!groupedMap.has(key)) {
          groupedMap.set(key, []);
        }

        groupedMap.get(key)!.push(item);
      });

    return Array.from(groupedMap.entries()).map(([key, items]) => {
      const firstItem = items[0];

      return {
        key,
        title: firstItem.customCategoryConfigName,
        class: String(firstItem.class),
        columns: String(this.getSectionColumnsFromClass(firstItem.class)),
        configId: firstItem.customCategoryConfigId,
        configSLNo: firstItem.configSLNo,
        items: items.sort((a, b) => (a.sequenceNo ?? 0) - (b.sequenceNo ?? 0)),
      };
    });
  }

  isBannerSection(section: any): boolean {
    return String(section.class) === '12';
  }

  getSectionColumnsFromClass(classValue: string | number): number {
    const value = classValue;

    switch (value) {
      case '12':
        return 1;
      case '2':
        return 6;
      case '3':
        return 4;
      case '4':
        return 3;
      case '5':
        return 5;
      case '6':
        return 6;
      case '7':
        return 7;
      default:
        return 4;
    }
  }

  getGridClass(columns: string | number): string {
    const col = Number(columns);

    switch (col) {
      case 3:
        return 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3';

      case 4:
        return 'grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4';

      case 5:
        return 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5';

      case 6:
        return 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6';

      case 7:
        return 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7';

      default:
        return 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4';
    }
  }

  getCategoryLink(item: any): any[] {
    return ['/product-category'];
  }

  getCategoryQueryParams(item: any): any {
    const params: any = {};

    if (item.categoryId && item.categoryId > 0) {
      params.categoryId = item.categoryId;
    }

    return params;
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
