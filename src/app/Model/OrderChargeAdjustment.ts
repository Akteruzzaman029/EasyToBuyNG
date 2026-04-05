export class OrderChargeAdjustmentFilterRequestDto {
  public salesOrderId: number = 0;
  public chargeHead: string = '';

  constructor(init?: Partial<OrderChargeAdjustmentFilterRequestDto>) {
    Object.assign(this, init);
  }
}

export class OrderChargeAdjustmentRequestDto {
  public salesOrderId: number = 0;
  public chargeHead: string = '';
  public amount: number = 0;
  public isAddition: boolean = true;
  public reason: string = '';
  public userId: string = '';
  constructor(init?: Partial<OrderChargeAdjustmentRequestDto>) {
    Object.assign(this, init);
  }
}
