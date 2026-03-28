import { CommonModule, DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductFilterDto } from '../../Model/Product';
import { ToastrService } from 'ngx-toastr';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { TruncatePipe } from '../../Shared/Pipe/truncate.pipe';
import { CartService } from '../../Shared/Service/cart.service';
import { CartRequestDto } from '../../Model/Cart';
import { CategoryWiseProductComponent } from '../category-wise-product/category-wise-product.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CategoryGroupComponent } from '../category-group/category-group.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { BannerCarouselComponent } from '../banner-carousel/banner-carousel.component';
import { BannerFilterRequestDto } from '../../Model/Banner';
import { CategoryFilterRequestDto } from '../../Model/Category';
import { CustomCategoryFilterDto } from '../../Model/CustomCategory';
import { CategoryNavbarComponent } from '../category-navbar/category-navbar.component';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
@Component({
  selector: 'app-easy-to-buy-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NzStepsModule,
    TruncatePipe,
    CategoryWiseProductComponent,
    CategoryGroupComponent,
    BannerCarouselComponent,
    CategoryNavbarComponent,
  ],
  templateUrl: './easy-to-buy-home.component.html',
  styleUrl: './easy-to-buy-home.component.scss',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'en-US' }],
})
export class EasyToBuyHomeComponent implements OnInit {
  public oProductFilterDto = new ProductFilterDto();
  public oCartRequestDto = new CartRequestDto();
  public oCurrentUser = new UserResponseDto();

  public oCustomCategoryFilterDto = new CustomCategoryFilterDto();
  public productList: any[] = [];

  public oBannerFilterRequestDto = new BannerFilterRequestDto();
  public homeSliderList: any[] = [];
  public homeTopList: any[] = [];
  public homeMiddleList: any[] = [];

  groupedCategories: any[] = [];
  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();

  nodes: any[] = [];
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private cartService: CartService,
    private datePipe: DatePipe,
  ) {
    this.oCurrentUser = CommonHelper.GetUser();
  }

  ngOnInit(): void {
    // Initialization logic can go here
    this.GetAllCustomCategories();
    this.GetProduct();
    this.GetAllBanners();
    this.GetCategoryTree();
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
          this.nodes = CommonHelper.buildMenu(res);
          console.log(this.nodes);
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  private getGroupTitle(typeTag: string): string {
    switch (typeTag) {
      case 'product_category':
        return 'Shop by Category';
      case 'product_sub_category':
        return 'Shop by Concern';
      case 'brand':
        return 'Shop by Brand';
      case 'offer_category':
        return 'Offers';
      default:
        return typeTag;
    }
  }

  groupByTypeTag(data: any[]): any[] {
    const groupedMap = new Map<string, any[]>();
    data
      .filter((x) => x.isActive)
      .sort((a, b) => a.sequenceNo - b.sequenceNo)
      .forEach((item) => {
        if (!groupedMap.has(item.typeTag)) {
          groupedMap.set(item.typeTag, []);
        }
        groupedMap.get(item.typeTag)!.push(item);
      });

    return Array.from(groupedMap.entries()).map(([typeTag, items]) => ({
      typeTag,
      title: this.getGroupTitle(typeTag),
      items,
    }));
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
  private GetAllBanners() {
    this.oBannerFilterRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oBannerFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oBannerFilterRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http.Post(`Banner/GetAllBanners`, this.oProductFilterDto).subscribe(
      (res: any) => {
        this.homeSliderList = CommonHelper.getBannerByType('home_slider', res);
        this.homeTopList = CommonHelper.getBannerByType('home_top', res);
        this.homeMiddleList = CommonHelper.getBannerByType('home_middle', res);
      },
      (err) => {
        this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
      },
    );
  }

  private GetAllCustomCategories() {
    this.oCustomCategoryFilterDto.companyId = Number(
      CommonHelper.GetComapyId(),
    );
    this.oCustomCategoryFilterDto.categoryId = Number(-1);
    this.oCustomCategoryFilterDto.isActive = CommonHelper.booleanConvert(
      this.oCustomCategoryFilterDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(
        `CustomCategory/GetAllCustomCategories`,
        this.oCustomCategoryFilterDto,
      )
      .subscribe(
        (res: any) => {
          this.groupedCategories = this.groupByTypeTag(res);
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
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
