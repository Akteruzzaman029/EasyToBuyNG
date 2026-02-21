import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Shared/Service/auth.service';
import { CartService } from '../../Shared/Service/cart.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { FormsModule } from '@angular/forms';
import { CategoryFilterRequestDto, CategoryRequestDto } from '../../Model/Category';
import { AGGridHelper } from '../../Shared/Service/AGGridHelper';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { CategoryComponent } from "../../Component/category/category.component";
import { CategoryProductComponent } from "../category-product/category-product.component";

@Component({
  selector: 'app-category-wise-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CategoryComponent, CategoryProductComponent],
  templateUrl: './category-wise-product.component.html',
  styleUrl: './category-wise-product.component.scss',
  providers: [DatePipe],
})
export class CategoryWiseProductComponent implements OnInit {

  public categoryList: any[] = [];
  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();
  trackByFn: TrackByFunction<any> | any;
  trackByCategory: TrackByFunction<any> | any;
  trackByCategoryFrom: TrackByFunction<any> | any;
  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe) {
  }


  ngOnInit(): void {
    this.GetCategorys();
  }



  detailToGrid(params: any) {
    const eDiv = document.createElement('div');
    eDiv.innerHTML = ' <button class="btn btn-success p-0 px-1"> <i class="bi bi-eye-fill"></i> Detail</button>'
    eDiv.addEventListener('click', () => {
      this.router.navigateByUrl('transactions/' + params.data.transactionId)
    });
    return eDiv;
  }


  private GetCategorys() {
    this.oCategoryFilterRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oCategoryFilterRequestDto.parentId = 0;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(this.oCategoryFilterRequestDto.isActive);
    this.http.Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto).subscribe(
      (res: any) => {
        this.categoryList = res;
      },
      (err) => {
        this.toast.error(err.ErrorMessage, "Error!!", { progressBar: true });
      }
    );

  }


}
