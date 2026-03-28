export class CustomCategoryConfigFilterDto {

    constructor() {
        this.name = '';
        this.companyId = 0;
        this.isActive = true;
    }
    public name: string;
    public companyId: number;
    public isActive: boolean;
}

export class CustomCategoryConfigRequestDto {

    constructor() {
        this.name = '';
        this.class = '';
        this.companyId = 0;
        this.sequenceNo = 0;
        this.isActive = true;
        this.remarks = "";
    }
    public name: string;
    public class: string;
    public remarks: string;
    public companyId: number;
    public sequenceNo: number;
    public isActive: boolean;
}

