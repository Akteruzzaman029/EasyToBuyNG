import {
  Component,
  LOCALE_ID,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { AddToCartItemComponent } from '../../General/add-to-cart-item/add-to-cart-item.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Shared/Service/auth.service';
import { CartService } from '../../Shared/Service/cart.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { CartFilterDto } from '../../Model/Cart';
import { CategoryNavbarComponent } from '../../General/category-navbar/category-navbar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CategoryFilterRequestDto } from '../../Model/Category';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterModule,
    RouterModule,
    AddToCartItemComponent,
    CategoryNavbarComponent,
    NzButtonModule,
    NzDrawerModule,
    NzSpaceModule,
    NzIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'en-US' }],
})
export class HomeComponent implements OnInit, OnDestroy {
  public cartItemCount: number = 0;
  public oCurrentUser = new UserResponseDto();
  public oCartFilterDto = new CartFilterDto();
  subscription: any;
  email: string = 'queries@rongtulicosmetics.com';
  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();
  visible = false;
  size: number | string = 360;

  expandedParentId: number | null = null;
  expandedChildId: number | null = null;

  drawerTitle = 'Menu';

  megaMenus: any[] = []; // your API transformed menu data

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.expandedParentId = null;
    this.expandedChildId = null;
  }

  toggleParent(id: number): void {
    this.expandedChildId = null;
    this.expandedParentId = this.expandedParentId === id ? null : id;
  }

  toggleChild(id: number): void {
    this.expandedChildId = this.expandedChildId === id ? null : id;
  }

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

  private GetCategoryTree() {
    let currentUser = CommonHelper.GetUser();
    this.oCategoryFilterRequestDto.companyId = Number(currentUser?.companyId);
    this.oCategoryFilterRequestDto.parentId = -1;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCategoryFilterRequestDto.isActive,
    );
    // After the hash is generated, proceed with the API call
    this.http
      .Post(`Category/GetCategoryTree`, this.oCategoryFilterRequestDto)
      .subscribe(
        (res: any) => {
          this.megaMenus = CommonHelper.buildMenu(res);
          // this.categoryList = res;
          console.log(this.megaMenus);
        },
        (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      );
  }

  ngOnInit(): void {
    console.log(
      this.authService.isMobile(),
      this.authService.isTablet(),
      this.authService.isDesktop(),
    );
    this.GetCategoryTree();
    this.subscription = this.cartService.onCartUpdated().subscribe(() => {
      // re‑load your cart count, re‑render badge, etc.
      this.loadCart();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private GetAllCarts() {
    this.oCartFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oCartFilterDto.userId = '';
    this.oCartFilterDto.guestId = this.cartService.getOrCreateGuestId();
    this.oCartFilterDto.isActive = true;
    // After the hash is generated, proceed with the API call
    this.http.Post(`Cart/GetAllCarts`, this.oCartFilterDto).subscribe(
      (res: any) => {
        this.cartItemCount = res.length;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
      },
    );
  }

  loadCart(): void {
    this.GetAllCarts();
  }

  offcanvasButton() {
    CommonHelper.CommonButtonClick('offcanvasButton');
  }

  getInputStyles() {
    if (this.authService.isMobile()) {
      return { width: '200px', 'font-size': '12px' }; // Mobile style
    } else if (this.authService.isTablet()) {
      return { width: '200px', 'font-size': '14px' }; // Tablet style
    } else {
      return { width: '560px', 'font-size': '16px' }; // Desktop style
    }
  }
}
