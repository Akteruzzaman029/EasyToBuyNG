import { Component, inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
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
import { Store } from '@ngrx/store';
import {
  selectCategoryTree,
  selectCategoryTreeLoading,
  selectCategoryTreeError,
  selectShouldLoadCategoryTree,
} from '../../store/Category/category.selector';
import { take } from 'rxjs';
import { loadCategoryTree } from '../../store/Category/category.action';
import { DebounceInputDirective } from '../../Shared/directives/debounce-input.directive';
import { MobileFooterComponent } from "../../Shared/mobile-footer/mobile-footer.component";
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
    NzIconModule,
    DebounceInputDirective,
    MobileFooterComponent
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
  visible = false;
  size: number | string = 360;

  searchTxt: string = '';
  expandedParentId: number | null = null;
  expandedChildId: number | null = null;

  drawerTitle = 'Menu';

  megaMenus: any[] = []; // your API transformed menu data

  onSearch(value: any): void {
    this.authService.searchParam.next(value);
    this.router.navigate(['//product-category']);
  }

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

  private store = inject(Store);
  categoryTree$ = this.store.select(selectCategoryTree);
  loading$ = this.store.select(selectCategoryTreeLoading);
  error$ = this.store.select(selectCategoryTreeError);

  oCategoryFilterRequestDto: any = {
    companyId: 0,
    parentId: -1,
    isActive: true,
  };

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
    this.getCategoryTree();

    this.categoryTree$.subscribe((res) => {
      this.megaMenus = CommonHelper.buildMenu(res);
    });

    this.error$.subscribe((err) => {
      if (err) {
        this.toast.error(err, 'Error!!', { progressBar: true });
      }
    });

    this.subscription = this.cartService.onCartUpdated().subscribe(() => {
      // re‑load your cart count, re‑render badge, etc.
      this.loadCart();
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
