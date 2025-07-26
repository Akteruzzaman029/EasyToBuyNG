import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { AddToCartItemComponent } from "../../General/add-to-cart-item/add-to-cart-item.component";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Shared/Service/auth.service';
import { CartService } from '../../Shared/Service/cart.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { CartFilterDto } from '../../Model/Cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, RouterModule, AddToCartItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DatePipe, CartService, { provide: LOCALE_ID, useValue: 'en-US' }]
})
export class HomeComponent implements OnInit {

  public cartItemCount: number = 0;
  public oCurrentUser = new UserResponseDto();
  public oCartFilterDto = new CartFilterDto();
  subscription: any;

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private cartService: CartService,
    private router: Router,
    private datePipe: DatePipe) {
    this.oCurrentUser = CommonHelper.GetUser();
  }

  ngOnInit(): void {
    this.subscription = this.cartService.onCartUpdated().subscribe(() => {
      this.loadCart(); // your method to refresh cart items
    });
  }

  private GetAllCarts() {
    this.oCartFilterDto.companyId = Number(this.oCurrentUser?.companyId);
    this.oCartFilterDto.userId = "";
    this.oCartFilterDto.guestId = this.cartService.getOrCreateGuestId();
    this.oCartFilterDto.isActive = true;
    // After the hash is generated, proceed with the API call
    this.http.Post(`Cart/GetAllCarts`, this.oCartFilterDto).subscribe(
      (res: any) => {
        this.cartItemCount = res.length;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }

  loadCart(): void {
    this.GetAllCarts();
  }

  offcanvasButton() {
    CommonHelper.CommonButtonClick("offcanvasButton");
  }
}
