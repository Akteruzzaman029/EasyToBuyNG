export class OrderFilterDto {

    constructor() {
        this.companyId = 0;
        this.startDate = new Date();
        this.endDate = new Date();
        this.userId = '';
        this.orderNo = '';
        this.orderStatus = 0;
        this.isActive = true;
    }
    public companyId: number;
    public startDate: Date;
    public endDate: Date;
    public userId: string;
    public orderNo: string;
    public orderStatus: number;
    public isActive: boolean;
}


export class OrderRequestDto {

    constructor() {
        this.companyId = 0;
        this.userId = '';
        this.orderNo = "";
        this.totalAmount = 0;
        this.totalDiscount = 0;
        this.orderStatus = 0;
        this.isActive = true;
        this.remarks = "";
    }
    public companyId: number;
    public userId: string;
    public orderNo: string;
    public totalAmount: number;
    public totalDiscount: number;
    public orderStatus: number;
    public remarks: string;
    public isActive: boolean;
}
