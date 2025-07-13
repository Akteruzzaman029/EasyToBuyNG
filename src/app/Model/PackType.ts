export class PackTypeFilterDto {

    constructor() {
        this.companyId =0;
        this.name = '';
        this.isActive = true;
    }
    public companyId: number;
    public name: string;
    public isActive: boolean;
}

export class PackTypeRequestDto {

    constructor() {
        this.name = '';
        this.shortName = '';
        this.companyId = 0;
        this.isActive = true;
        this.remarks = "";
    }
    public name: string;
    public shortName: string;
    public companyId: number;
    public remarks: string;
    public isActive: boolean;
}