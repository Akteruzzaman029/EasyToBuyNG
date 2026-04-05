export class OrderDeliveryChargeDetailFilterRequestDto {
  public companyId: number = 0;
  public salesOrderId: number = 0;
  public deliveryChargeRuleId: number = 0;

  constructor(init?: Partial<OrderDeliveryChargeDetailFilterRequestDto>) {
    Object.assign(this, init);
  }
}

export class OrderDeliveryChargeDetailRequestDto {
  public companyId: number = 0;
  public salesOrderId: number = 0;
  public deliveryChargeRuleId: number = 0;
  public baseCharge: number = 0;
  public distanceCharge: number = 0;
  public weightCharge: number = 0;
  public areaCharge: number = 0;
  public expressCharge: number = 0;
  public remoteAreaCharge: number = 0;
  public discountAmount: number = 0;
  public finalCharge: number = 0;
  public userId: string = '';
  public remarks: string = '';

  constructor(init?: Partial<OrderDeliveryChargeDetailRequestDto>) {
    Object.assign(this, init);
  }
}
