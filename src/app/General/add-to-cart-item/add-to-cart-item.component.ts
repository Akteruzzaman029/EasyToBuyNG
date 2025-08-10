import { CommonModule, DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TruncatePipe } from '../../Shared/Pipe/truncate.pipe';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Shared/Service/auth.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { CartFilterDto, CartRequestDto } from '../../Model/Cart';
import { CartService } from '../../Shared/Service/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';

@Component({
  selector: 'app-add-to-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TruncatePipe],
  templateUrl: './add-to-cart-item.component.html',
  styleUrl: './add-to-cart-item.component.scss',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'en-US' }]
})
export class AddToCartItemComponent implements OnInit, OnDestroy {
  public oCartFilterDto = new CartFilterDto();
  public oCurrentUser = new UserResponseDto();
  public oCartRequestDto = new CartRequestDto()
  public cartItemList: any[] = [];
  private subscription: Subscription | any;

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private cartService: CartService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.oCurrentUser = CommonHelper.GetUser();


  }

  ngOnInit(): void {
    debugger
    this.subscription = this.cartService.onCartUpdated().subscribe(() => {
      // re‑load your cart count, re‑render badge, etc.
      this.loadCart();
    });

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadCart(): void {
    this.oCartFilterDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oCartFilterDto.userId = '';
    this.oCartFilterDto.guestId = this.cartService.getOrCreateGuestId();
    this.oCartFilterDto.isActive = true;

    this.http.Post(`Cart/GetAllCarts`, this.oCartFilterDto).subscribe(
      (res: any) => {
        this.cartItemList = res;
      },
      (err) => {
        this.toast.error(err?.ErrorMessage || 'Failed to load cart.', 'Error!!', { progressBar: true });
      }
    );
  }

  increaseQty(item: any): void {
    this.oCartRequestDto = new CartRequestDto();
    this.oCartRequestDto.guestId = this.cartService.getOrCreateGuestId();
    this.oCartRequestDto.companyId = item.companyId;
    this.oCartRequestDto.productId = item.productId;
    this.oCartRequestDto.quantity = 1;
    this.oCartRequestDto.actionType = 1;
    this.http.Post("Cart/InsertCart", this.oCartRequestDto).subscribe(
      (res) => {
        this.cartService.notifyCartUpdated(); // Notify cart update
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );
  }

  decreaseQty(item: any): void {
    this.oCartRequestDto = new CartRequestDto();
    this.oCartRequestDto.guestId = this.cartService.getOrCreateGuestId();
    this.oCartRequestDto.companyId = item.companyId;
    this.oCartRequestDto.productId = item.productId;
    this.oCartRequestDto.quantity = 1;
    this.oCartRequestDto.actionType = -1;
    this.http.Post("Cart/InsertCart", this.oCartRequestDto).subscribe(
      (res) => {
        this.cartService.notifyCartUpdated(); // Notify cart update
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );
  }

  removeItem(item: any): void {
    this.oCartRequestDto = new CartRequestDto();
    this.oCartRequestDto.guestId = this.cartService.getOrCreateGuestId();
    this.oCartRequestDto.companyId = item.companyId;
    this.oCartRequestDto.productId = item.productId;
    this.oCartRequestDto.quantity = 1;
    this.oCartRequestDto.actionType = 0;
    this.http.Post("Cart/InsertCart", this.oCartRequestDto).subscribe(
      (res) => {
        this.cartService.notifyCartUpdated(); // Notify cart update
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );
  }

  getTotalItems(): number {
    return this.cartItemList.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubTotal(): number {
    return this.cartItemList.reduce((sum, item) => sum + item.purchasePrice * item.quantity, 0);
  }

  getTotalDiscount(): number {
    return this.cartItemList.reduce((sum, item) => sum + item.discount * item.quantity, 0);
  }

  getGrandTotal(): number {
    return this.getSubTotal() - this.getTotalDiscount();
  }

  checkout(): void {
    this.toast.info('Proceeding to checkout...');
    // You could navigate to a checkout page or open a modal
    this.router.navigate(['/checkout']);
  }
}