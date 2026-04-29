export class ProductFilterDto {
  constructor() {
    this.companyId = 0;
    this.categoryId = 0;
    this.subCategoryId = 0;
    this.measurementUnitId = 0;
    this.packTypeId = 0;
    this.modelNo = '';
    this.name = '';
    this.isActive = true;
    this.brandIds = "";
    this.minPrice = 0;
    this.maxPrice = 0;
    this.rating = 0;
    this.inStock = true;
    this.sortBy = '';
  }
  public companyId: number;
  public categoryId: number;
  public subCategoryId: number;
  public measurementUnitId: number;
  public packTypeId: number;
  public modelNo: string;
  public name: string;
  public isActive: boolean;
  public brandIds: string;
  public minPrice: number;
  public maxPrice: number;
  public rating: number;
  public inStock: boolean;
  public sortBy: string;
}

export class ProductRequestDto {
  constructor() {
    this.companyId = 0;
    this.categoryId = 0;
    this.subCategoryId = 0;
    this.measurementUnitId = 0;
    this.packTypeId = 0;
    this.modelNo = '';
    this.purchasePrice = 0;
    this.vat = 0;
    this.name = '';
    this.shortName = '';
    this.description = '';
    this.isConsider = false;
    this.isBarCode = false;
    this.fileId = 0;
    this.stock = 0;
    this.isFixedAmount = false;
    this.discount = 0;
    this.remarks = '';
    this.userId = '';
    this.isActive = true;
    this.productImages = [];
    this.productSizes = [];
  }
  public companyId: number;
  public categoryId: number;
  public subCategoryId: number;
  public measurementUnitId: number;
  public packTypeId: number;
  public modelNo: string;
  public purchasePrice: number;
  public vat: number;
  public name: string;
  public shortName: string;
  public description: string;
  public isConsider: boolean;
  public isBarCode: boolean;
  public fileId: number;
  public stock: number;
  public isFixedAmount: boolean;
  public discount: number;
  public remarks: string;
  public userId: string;
  public isActive: boolean;
  public productImages: ProductImageDto[];
  public productSizes: ProductSizeDto[];
}

export class ProductImageDto {
  public id: number = 0;
  public companyId: number = 0;
  public productId: number = 0;
  public isPrimary: boolean = true;
  public imageUrl: string = '';
  public fileId: number = 0;
  public sequenceNo: number = 0;
  public remarks: string = '';
  public isActive: boolean = true;
}

export class ProductSizeDto {
  public id: number = 0;
  public companyId: number = 0;
  public productId: number = 0;
  public size: string = '';
  public price: number = 0;
  public stock: number = 0;
  public discountType: number = 0;
  public discountValue: number = 0;
  public discountStartDate: string = new Date().toISOString();
  public discountEndDate: string = new Date().toISOString();
  public sequenceNo: number = 0;
  public remarks: string = '';
  public isActive: boolean = true;
}