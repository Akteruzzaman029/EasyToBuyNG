export class StatusMasterFilterDto {

    constructor() {
        this.name = '';
        this.isActive = true;
    }
    public name: string;
    public isActive: boolean;
}

export class StatusMasterRequestDto {

    constructor() {
        this.statusGroup = '';
        this.statusCode = 0;
        this.statusName = '';
        this.description = '';

        this.isActive = true;
        this.remarks = "";
    }
    public statusGroup: string;
    public statusCode: number;
    public statusName: string;
    public description: string;
    public remarks: string;
    public isActive: boolean;
}