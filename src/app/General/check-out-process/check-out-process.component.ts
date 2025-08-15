import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { AddToCartItemComponent } from "../add-to-cart-item/add-to-cart-item.component";
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartFilterDto, CartRequestDto } from '../../Model/Cart';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { TruncatePipe } from '../../Shared/Pipe/truncate.pipe';
import { AuthService } from '../../Shared/Service/auth.service';
import { CartService } from '../../Shared/Service/cart.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { OrderRequestDto } from '../../Model/Order';
import { OrderItemRequestDto } from '../../Model/OrderItem';
import { AddressFilterDto, AddressRequestDto } from '../../Model/Address';
import { DeliveryAddressComponent } from "../delivery-address/delivery-address.component";

@Component({
  selector: 'app-check-out-process',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TruncatePipe, DeliveryAddressComponent],
  templateUrl: './check-out-process.component.html',
  styleUrl: './check-out-process.component.scss',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'en-US' }]
})
export class CheckOutProcessComponent implements OnInit, OnDestroy {
  public oCartFilterDto = new CartFilterDto();
  public oCurrentUser = new UserResponseDto();
  public oCartRequestDto = new CartRequestDto()
  public oAddressRequestDto = new AddressRequestDto()
  public oAddressFilterDto = new AddressFilterDto()
  public cartItemList: any[] = [];
  private subscription: Subscription | any;

  public oOrderRequestDto = new OrderRequestDto();

  selectedPayment: string = 'online'; // default selection

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
    this.subscription = this.cartService.onCartUpdated().subscribe(() => {
      this.loadCart();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadCart(): void {
    this.oCartFilterDto.companyId = Number(CommonHelper.GetComapyId());
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
    if (this.selectedPayment == 'online') {
      this.toast.success("Order Online", "Success!!", { progressBar: true });

    } else if (this.selectedPayment == 'cash') {
      this.toast.success("Order Cash on Delivery", "Success!!", { progressBar: true });
    }
  }


  InsertOrder(): void {

    this.oOrderRequestDto.orderType = Number(this.selectedPayment == 'cash' ? 1 : this.selectedPayment == 'online' ? 2 : 0);
    this.oOrderRequestDto.orderStatus = 0;
    this.oOrderRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oOrderRequestDto.userId = this.oCurrentUser.userId;
    this.cartItemList.forEach((element: any) => {
      let oOrderItemRequestDto = new OrderItemRequestDto();
      oOrderItemRequestDto.orderId = 0;
      oOrderItemRequestDto.productId = element.productId;
      oOrderItemRequestDto.quantity = element.quantity;
      oOrderItemRequestDto.unitPrice = element.unitPriceAfterDiscount;
      oOrderItemRequestDto.discount = element.discount;
      oOrderItemRequestDto.isFixedAmount = true;
      oOrderItemRequestDto.isActive = element.isActive;
      this.oOrderRequestDto.orderItems.push(oOrderItemRequestDto);
    });


    this.http.Post("Order/InsertOrder", this.oOrderRequestDto).subscribe(
      (res) => {

        this.cartService.notifyCartUpdated(); // Notify cart update
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );
  }






}