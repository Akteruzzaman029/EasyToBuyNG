export class CustomCategoryFilterDto {

    constructor() {
        this.name = '';
        this.typeTag = '';
        this.companyId = 0;
        this.categoryId = 0;
        this.isActive = true;
    }
    public name: string;
    public typeTag: string;
    public companyId: number;
    public categoryId: number;
    public isActive: boolean;
}

export class CustomCategoryRequestDto {

    constructor() {
        this.name = '';
        this.typeTag = '';
        this.companyId = 0;
        this.fileId = 0;
        this.categoryId = 0;
        this.sequenceNo = 0;
        this.isActive = true;
        this.remarks = "";
    }
    public name: string;
    public typeTag: string;
    public remarks: string;
    public companyId: number;
    public fileId: number;
    public categoryId: number;
    public sequenceNo: number;
    public isActive: boolean;
}

