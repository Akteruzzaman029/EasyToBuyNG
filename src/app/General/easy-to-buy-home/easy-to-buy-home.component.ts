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

  public oBannerFilterRequestDto = new BannerFilterRequestDto();
  public homeSliderList: any[] = [];
  public homeTopList: any[] = [];
  public homeMiddleList: any[] = [];
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
    this.GetProduct();
    this.GetAllBanners();
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
