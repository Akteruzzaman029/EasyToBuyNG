export class MeasurementUnitFilterDto {

    constructor() {
        this.companyId =0;
        this.unitName = '';
        this.unitType = 0;
        this.isActive = true;
    }
    public companyId: number;
    public unitName: string;
    public unitType: number;
    public isActive: boolean;
}


export class MeasurementUnitRequestDto {

    constructor() {
        this.companyId = 0;
        this.unitName = '';
        this.symbol = "";
        this.unitType = 0;
        this.note = "";
        this.isRound =true;
        this.isSmallUnit = true;
        this.symbolInBangla = "";
        this.isActive = true;
        this.remarks = "";
    }
    public companyId: number;
    public unitName: string;
    public symbol: string;
    public unitType: number;
    public note: string;
    public isRound: boolean;
    public isSmallUnit: boolean;
    public symbolInBangla: string;
    public remarks: string;
    public isActive: boolean;
}
