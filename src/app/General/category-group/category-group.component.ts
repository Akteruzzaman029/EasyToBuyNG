import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryProductComponent } from '../category-product/category-product.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryFilterRequestDto } from '../../Model/Category';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';

@Component({
  selector: 'app-category-group',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CategoryProductComponent],
  templateUrl: './category-group.component.html',
  styleUrl: './category-group.component.scss',
  providers: [DatePipe],
})
export class CategoryGroupComponent implements OnInit {
  public categoryList: any[] = [];
  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();

  trackByCategory: TrackByFunction<any> = (_: number, item: any) => item.id;
  
  constructor(
    private toast: ToastrService,
    private http: HttpHelperService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  public GetImageUrl(fileId: number): string {
    return `${this.http.appUrl}UploadedFile/GetImage/${fileId}`;
  }

  private loadCategories(): void {
    const companyId = Number(CommonHelper.GetComapyId());
    this.oCategoryFilterRequestDto.companyId = companyId;
    this.oCategoryFilterRequestDto.parentId = 0;
    this.oCategoryFilterRequestDto.isActive = CommonHelper.booleanConvert(
      this.oCategoryFilterRequestDto.isActive,
    );

    this.http
      .Post('Category/GetAllCategories', this.oCategoryFilterRequestDto)
      .subscribe({
        next: (res: any) => {
          this.categoryList = res ?? [];
        },
        error: (err) => {
          this.toast.error(err.ErrorMessage, 'Error!!', { progressBar: true });
        },
      });
  }
}
