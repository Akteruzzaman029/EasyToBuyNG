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
    }
    public companyId: number;
    public categoryId: number;
    public subCategoryId: number;
    public measurementUnitId: number;
    public packTypeId: number;
    public modelNo: string;
    public name: string;
    public isActive: boolean;
}


export class ProductRequestDto {

    constructor() {

        this.companyId = 0;
        this.categoryId = 0;
        this.subCategoryId = 0;
        this.measurementUnitId = 0;
        this.packTypeId = 0;
        this.modelNo =  "";
        this.purchasePrice = 0;
        this.vat = 0;
        this.name = "";
        this.shortName = "";
        this.description = "";
        this.isConsider =false;
        this.isBarCode = false;
        this.fileId = 0;
        this.stock = 0;
        this.isFixedAmount =false;
        this.discount = 0;
        this.remarks =  "";
        this.userId =  "";
        this.isActive = true;
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
}
