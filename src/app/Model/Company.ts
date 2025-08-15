export class CompanyFilterDto {

    constructor() {
        this.code = "";
        this.name = '';
        this.shortName = '';
        this.address = '';
        this.isActive = true;
    }
    public code: string;
    public name: string;
    public shortName: string;
    public address: string;
    public isActive: boolean;
}

export class CompanyRequestDto {

    constructor() {
        this.code = "";
        this.name = '';
        this.shortName = '';
        this.address = '';
        this.isActive = true;
        this.remarks = "";
    }
    public code: string;
    public name: string;
    public shortName: string;
    public address: string;
    public remarks: string;
    public isActive: boolean;
}