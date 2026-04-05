export class SalesOrderFilterRequestDto {
  public orderNo: string = '';
  public companyId: number = 0;
  public customerId: number = 0;
  public orderTypeId: number = 0;
  public flowId: number = 0;
  public currentStageId: number = 0;
  public deliveryChargeRuleId: number = 0;
  public paymentStatus: number = 0;
  public deliveryStatus: number = 0;
  public orderStatus: number = 0;
  public isActive: boolean = true;

  constructor(init?: Partial<SalesOrderFilterRequestDto>) {
    Object.assign(this, init);
  }
}

export class SalesOrderRequestDto {
  public orderNo: string = '';
  public companyId: number = 0;
  public branchId: number = 0;
  public customerId: number = 0;
  public addressId: number = 0;
  public userId: string = '';
  public orderTypeId: number = 0;
  public flowId: number = 0;
  public currentStageId: number = 0;
  public orderDate: Date = new Date();
  public expectedDeliveryDate: Date = new Date();
  public itemTotalAmount: number = 0;
  public totalDiscount: number = 0;
  public deliveryCharge: number = 0;
  public extraDeliveryCharge: number = 0;
  public discountOnDelivery: number = 0;
  public finalDeliveryCharge: number = 0;
  public netAmount: number = 0;
  public deliveryChargeRuleId: number = 0;
  public paymentStatus: number = 0;
  public deliveryStatus: number = 0;
  public orderStatus: number = 0;
  public confirmedAt: Date = new Date();
  public cancelledAt: Date = new Date();
  public completedAt: Date = new Date();
  public remarks: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<SalesOrderRequestDto>) {
    Object.assign(this, init);
  }
}
