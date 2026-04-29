import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductImageDto, ProductRequestDto, ProductSizeDto } from '../../Model/Product';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryFilterRequestDto } from '../../Model/Category';
import { PackTypeFilterDto } from '../../Model/PackType';
import { MeasurementUnitFilterDto } from '../../Model/MeasurementUnit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {

  public oProductRequestDto = new ProductRequestDto();

  public categoryList: any[] = [];
  public subCategoryFromList: any[] = [];
  public measurementUnitList: any[] = [];
  public packTypeList: any[] = [];

  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();
  public oPackTypeFilterDto = new PackTypeFilterDto();
  public oMeasurementUnitFilterDto = new MeasurementUnitFilterDto();

  constructor(
    private http: HttpHelperService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.GetAllCategories();
    this.GetAllPackTypes();
    this.GetAllMeasurementUnits();
  }

  private GetAllCategories() {
    this.oCategoryFilterRequestDto.parentId = 0;
    this.oCategoryFilterRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oCategoryFilterRequestDto.isActive = true;

    this.http.Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto).subscribe((res: any) => {
      this.categoryList = res;
    });
  }

  public onCategoryChange(event: any) {
    this.oCategoryFilterRequestDto.parentId = Number(this.oProductRequestDto.categoryId);
    this.http.Post(`Category/GetAllCategories`, this.oCategoryFilterRequestDto).subscribe((res: any) => {
      this.subCategoryFromList = res;
    });
  }

  private GetAllPackTypes() {
    this.oPackTypeFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oPackTypeFilterDto.isActive = true;
    this.http.Post(`PackType/GetAllPackTypes`, this.oPackTypeFilterDto).subscribe((res: any) => {
      this.packTypeList = res;
    });
  }

  private GetAllMeasurementUnits() {
    this.oMeasurementUnitFilterDto.companyId = Number(CommonHelper.GetComapyId());
    this.oMeasurementUnitFilterDto.isActive = true;
    this.http.Post(`MeasurementUnit/GetAllMeasurementUnits`, this.oMeasurementUnitFilterDto).subscribe((res: any) => {
      this.measurementUnitList = res;
    });
  }

  public onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.http.UploadFile(`UploadedFile/Upload`, file).subscribe((res: any) => {
        this.oProductRequestDto.fileId = res.id;
        this.toast.success("ইমেজ আপলোড সফল হয়েছে");
      });
    }
  }

  removeImage(index: number) {
    this.oProductRequestDto.productImages.splice(index, 1);
  }

  addImage() {
    const newImage = new ProductImageDto();
    newImage.companyId = Number(CommonHelper.GetComapyId());
    newImage.isPrimary = this.oProductRequestDto.productImages.length === 0;
    newImage.sequenceNo = this.oProductRequestDto.productImages.length + 1;
    newImage.isActive = true;
    this.oProductRequestDto.productImages.push(newImage);
  }

  addSize() {
    const newSize = new ProductSizeDto();
    newSize.companyId = Number(CommonHelper.GetComapyId());
    newSize.sequenceNo = this.oProductRequestDto.productSizes.length + 1;
    newSize.isActive = true;
    this.oProductRequestDto.productSizes.push(newSize);
  }

  removeSize(index: number) {
    this.oProductRequestDto.productSizes.splice(index, 1);
  }

  public InsertProduct() {
    debugger
    if (!this.oProductRequestDto.name) {
      this.toast.warning("দয়া করে প্রোডাক্টের নাম লিখুন", "Warning!");
      return;
    }

    this.oProductRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oProductRequestDto.categoryId = Number(this.oProductRequestDto.categoryId);
    this.oProductRequestDto.subCategoryId = Number(this.oProductRequestDto.subCategoryId);
    this.oProductRequestDto.measurementUnitId = Number(this.oProductRequestDto.measurementUnitId);
    this.oProductRequestDto.packTypeId = Number(this.oProductRequestDto.packTypeId);
    this.oProductRequestDto.purchasePrice = Number(this.oProductRequestDto.purchasePrice);
    this.oProductRequestDto.vat = Number(this.oProductRequestDto.vat);
    this.oProductRequestDto.stock = Number(this.oProductRequestDto.stock);
    this.oProductRequestDto.discount = Number(this.oProductRequestDto.discount);

    this.oProductRequestDto.isConsider = CommonHelper.booleanConvert(this.oProductRequestDto.isConsider);
    this.oProductRequestDto.isBarCode = CommonHelper.booleanConvert(this.oProductRequestDto.isBarCode);
    this.oProductRequestDto.isFixedAmount = CommonHelper.booleanConvert(this.oProductRequestDto.isFixedAmount);
    this.oProductRequestDto.isActive = CommonHelper.booleanConvert(this.oProductRequestDto.isActive);
    this.oProductRequestDto.userId = CommonHelper.GetUser()?.userId;

    this.oProductRequestDto.productImages.forEach(img => {
      img.companyId = this.oProductRequestDto.companyId;
      img.sequenceNo = Number(img.sequenceNo);
      img.isActive = CommonHelper.booleanConvert(img.isActive);
      img.isPrimary = CommonHelper.booleanConvert(img.isPrimary);
      img.imageUrl = img.imageUrl || "";
      img.remarks = img.remarks || "";
    });

    this.oProductRequestDto.productSizes.forEach(size => {
      size.companyId = this.oProductRequestDto.companyId;
      size.price = Number(size.price);
      size.stock = Number(size.stock);
      size.discountValue = Number(size.discountValue);
      size.sequenceNo = Number(size.sequenceNo);
      size.isActive = CommonHelper.booleanConvert(size.isActive);
    });

    this.http.Post(`Product/InsertProduct`, this.oProductRequestDto).subscribe({
      next: (res: any) => {
        this.toast.success("প্রোডাক্টটি সফলভাবে সেভ হয়েছে", "Success!");
        setTimeout(() => {
          this.router.navigate(['/admin/product']);
        }, 2000);
      },
      error: (err) => {
        console.error("Save Error:", err);
        this.toast.error(err.ErrorMessage || "সেভ করতে সমস্যা হয়েছে", "Error!");
      }
    });
  }

  closeTab() {
    if (confirm("আপনি কি নিশ্চিত যে এই পেজটি বন্ধ করতে চান?")) {
      this.router.navigate(['/admin/product']);
    }
  }

  public onGridFileChange(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.http.UploadFile(`UploadedFile/Upload`, file).subscribe({
        next: (res: any) => {
          this.oProductRequestDto.productImages[index].fileId = res.id;

          this.toast.success("ফাইল আপলোড এবং পাথ সেট করা হয়েছে");
        },
        error: (err) => {
          this.toast.error("আপলোড ব্যর্থ হয়েছে");
        }
      });
    }
  }

}