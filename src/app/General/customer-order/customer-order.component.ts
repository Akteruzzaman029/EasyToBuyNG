import { CommonModule, DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddressFilterDto } from '../../Model/Address';
import { CartFilterDto, CartRequestDto } from '../../Model/Cart';
import { LoginRequestDto } from '../../Model/LoginRequestDto';
import { OrderFilterDto, OrderRequestDto } from '../../Model/Order';
import { OrderItemRequestDto } from '../../Model/OrderItem';
import { UserResponseDto } from '../../Model/UserResponseDto';
import { TruncatePipe } from '../../Shared/Pipe/truncate.pipe';
import { AuthService } from '../../Shared/Service/auth.service';
import { CartService } from '../../Shared/Service/cart.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { DeliveryAddressComponent } from '../delivery-address/delivery-address.component';

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TruncatePipe],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.scss',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'en-US' }],
})
export class CustomerOrderComponent implements OnInit, OnDestroy {
  public oCurrentUser = new UserResponseDto();
public oOrderFilterDto=new OrderFilterDto();
  public orderList: any[] = [];

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private route: Router,
    private datePipe: DatePipe,
  ) {
    this.oCurrentUser = CommonHelper.GetUser();
  }

  ngOnInit(): void {
    debugger
    if (this.oCurrentUser.userId == '') {
      this.route.navigateByUrl('login');
    }
    this.loadOrder();
  }

  ngOnDestroy(): void {}

  private loadOrder(): void {
    this.oOrderFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oOrderFilterDto.userId =this.oCurrentUser.userId;
    this.oOrderFilterDto.orderStatus = 1;
    this.oOrderFilterDto.isActive = true;

    this.http.Post(`Order/GetAllOrders`, this.oOrderFilterDto).subscribe(
      (res: any) => {
        this.orderList = res;
      },
      (err) => {
        this.toast.error(
          err?.ErrorMessage || 'Failed to load cart.',
          'Error!!',
          { progressBar: true },
        );
      },
    );
  }
}
