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

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent implements OnInit {

  public oProductRequestDto = new ProductRequestDto();
  
  // ড্রপডাউন লিস্টসমূহ
  public categoryList: any[] = [];
  public subCategoryFromList: any[] = [];
  public measurementUnitList: any[] = [];
  public packTypeList: any[] = [];

  // ফিল্টার অবজেক্টসমূহ (ড্রপডাউন ডাটা লোড করার জন্য)
  public oCategoryFilterRequestDto = new CategoryFilterRequestDto();
  public oPackTypeFilterDto = new PackTypeFilterDto();
  public oMeasurementUnitFilterDto = new MeasurementUnitFilterDto();

  constructor(
    private http: HttpHelperService, 
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    // পেজ লোড হওয়ার সময় মাস্টার ডাটাগুলো নিয়ে আসা
    this.GetAllCategories();
    this.GetAllPackTypes();
    this.GetAllMeasurementUnits();
  }

  // --- মাস্টার ডাটা লোড করার মেথডসমূহ ---

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

  // --- ফাইল আপলোড লজিক ---

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

  // --- ডাইনামিক টেবিল রো ম্যানেজমেন্ট ---

  addImage() {
    const newImage = new ProductImageDto();
    newImage.companyId = Number(CommonHelper.GetComapyId());
    this.oProductRequestDto.productImages.push(newImage);
  }

  removeImage(index: number) {
    this.oProductRequestDto.productImages.splice(index, 1);
  }

  addSize() {
    const newSize = new ProductSizeDto();
    newSize.companyId = Number(CommonHelper.GetComapyId());
    this.oProductRequestDto.productSizes.push(newSize);
  }

  removeSize(index: number) {
    this.oProductRequestDto.productSizes.splice(index, 1);
  }

  // --- ফাইনাল সেভ মেথড ---

  public InsertProduct() {
    if (!this.oProductRequestDto.name) {
      this.toast.warning("দয়া করে প্রোডাক্টের নাম লিখুন");
      return;
    }

    this.oProductRequestDto.companyId = Number(CommonHelper.GetComapyId());
    this.oProductRequestDto.userId = CommonHelper.GetUser()?.userId;

    // বুলিয়ান কনভার্সন (যদি প্রয়োজন হয়)
    this.oProductRequestDto.isActive = CommonHelper.booleanConvert(this.oProductRequestDto.isActive);

    this.http.Post(`Product/InsertProduct`, this.oProductRequestDto).subscribe({
      next: (res: any) => {
        this.toast.success("প্রোডাক্টটি সফলভাবে সেভ হয়েছে", "Success!");
        // সেভ হওয়ার ২ সেকেন্ড পর ট্যাবটি বন্ধ করে দেওয়া (ঐচ্ছিক)
        setTimeout(() => { window.close(); }, 2000);
      },
      error: (err) => {
        this.toast.error(err.ErrorMessage || "সেভ করতে সমস্যা হয়েছে", "Error!");
      }
    });
  }

  closeTab() {
    if (confirm("আপনি কি নিশ্চিত যে এই পেজটি বন্ধ করতে চান?")) {
      window.close();
    }
  }
}