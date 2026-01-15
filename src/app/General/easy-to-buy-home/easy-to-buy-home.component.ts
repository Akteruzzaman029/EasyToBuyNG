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
import { TruncatePipe } from "../../Shared/Pipe/truncate.pipe";
import { CartService } from '../../Shared/Service/cart.service';
import { CartRequestDto } from '../../Model/Cart';

@Component({
  selector: 'app-easy-to-buy-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TruncatePipe],
  templateUrl: './easy-to-buy-home.component.html',
  styleUrl: './easy-to-buy-home.component.scss',
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'en-US' }]
})
export class EasyToBuyHomeComponent implements OnInit {

  public oProductFilterDto = new ProductFilterDto();
  public oCartRequestDto = new CartRequestDto();
  public oCurrentUser = new UserResponseDto();
  public productList: any[] = [];

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private cartService: CartService,
    private datePipe: DatePipe) {
    this.oCurrentUser = CommonHelper.GetUser();
  }

  ngOnInit(): void {
    // Initialization logic can go here
    this.GetProduct();
  }


  private GetProduct() {
    this.oProductFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oProductFilterDto.categoryId = Number(this.oProductFilterDto.categoryId);
    this.oProductFilterDto.subCategoryId = Number(this.oProductFilterDto.subCategoryId);
    this.oProductFilterDto.measurementUnitId = Number(this.oProductFilterDto.measurementUnitId);
    this.oProductFilterDto.packTypeId = Number(this.oProductFilterDto.packTypeId);
    this.oProductFilterDto.isActive = CommonHelper.booleanConvert(this.oProductFilterDto.isActive);
    // After the hash is generated, proceed with the API call
    this.http.Post(`Product/GetAllProducts`, this.oProductFilterDto).subscribe(
      (res: any) => {
        this.productList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
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
    this.http.Post("Cart/InsertCart", this.oCartRequestDto).subscribe(
      (res) => {
        this.cartService.notifyCartUpdated(); // Notify cart update
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );
  }

}
