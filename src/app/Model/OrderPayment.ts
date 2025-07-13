export class OrderPaymentFilterDto {

    constructor() {
        this.companyId = 0;
        this.startDate = new Date();
        this.endDate = new Date();
        this.orderNo = '';
        this.reference = '';
        this.paymentStatus = 0;
        this.isActive = true;
    }
    public companyId: number;
    public startDate: Date;
    public endDate: Date;
    public orderNo: string;
    public reference: string;
    public paymentStatus: number;
    public isActive: boolean;
}

export class OrderPaymentRequestDto {

    constructor() {
        this.companyId = 0;
        this.orderId = 0;
        this.paymentMethod = "";
        this.reference = "";
        this.paymentStatus = 0;
        this.paidAmount = 0;
        this.isActive = true;
        this.remarks = "";
    }
    public companyId: number;
    public orderId: number;
    public paymentMethod: string;
    public reference: string;
    public paymentStatus: number;
    public paidAmount: number;
    public remarks: string;
    public isActive: boolean;
}