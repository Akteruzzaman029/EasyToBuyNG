export class OrderItemFilterDto {

    constructor() {
        this.orderId = 0;
        this.name = '';
        this.isActive = true;
    }
    public orderId: number;
    public name: string;
    public isActive: boolean;
}


export class OrderItemRequestDto {

    constructor() {
        this.cartId = 0;
        this.orderId = 0;
        this.productId = 0;
        this.quantity = 0;
        this.vat = 0;
        this.unitPrice = 0;
        this.discount = 0;
        this.isFixedAmount = false;
        this.isActive = true;
        this.productName = "";
        this.remarks = "";
    }
    public cartId: number;
    public orderId: number;
    public productId: number;
    public vat: number;
    public quantity: number;
    public unitPrice: number;
    public discount: number;
    public isFixedAmount: boolean;
    public remarks: string;
    public productName: string;
    public isActive: boolean;
}