export class CartFilterDto {

    constructor() {
        this.companyId =0;
        this.userId = '';
        this.guestId = '';
        this.cartType = 0;
        this.isActive = true;
    }
    public companyId: number;
    public userId: string;
    public guestId: string;
    public cartType: number;
    public isActive: boolean;
}

export class CartRequestDto {

    constructor() {
        this.companyId = 0;
        this.userId = '';
        this.guestId = '';
        this.cartType = 0;
        this.productId = 0;
        this.quantity = 0;
        this.isActive = true;
        this.remarks = "";
    }
    public companyId: number;
    public userId: string;
    public guestId: string;
    public cartType: number;
    public productId: number;
    public quantity: number;
    public remarks: string;
    public isActive: boolean;
}