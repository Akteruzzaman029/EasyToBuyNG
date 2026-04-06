export class OrderTrackingFilterDto {
  public salesOrderId: number = 0;
  public orderFlowStageId: number = 0;
  public trackingStatus: number = 0;
  public isCustomerVisible: boolean = true;
  public isActive: boolean = true;

  constructor(init?: Partial<OrderTrackingFilterDto>) {
    Object.assign(this, init);
  }
}

export class OrderTrackingRequestDto {
  public salesOrderId: number = 0;
  public orderFlowStageId: number = 0;
  public trackingStatus: number = 0;
  public trackingMessage: string = '';
  public locationName: string = '';
  public latitude: number = 0;
  public longitude: number = 0;
  public changedBy: string = '';
  public changedAt: Date = new Date();
  public isCustomerVisible: boolean = true;
  public userId: string = '';
  public remarks: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<OrderTrackingRequestDto>) {
    Object.assign(this, init);
  }
}
