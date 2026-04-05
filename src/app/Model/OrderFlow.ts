export class OrderFlowFilterDto {
  public companyId: number = 0;
  public oderTypeId: number = 0;
  public name: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<OrderFlowFilterDto>) {
    Object.assign(this, init);
  }
}

export class OrderFlowRequestDto {
  public companyId: number = 0;
  public oderTypeId: number = 0;
  public name: string = '';
  public isDefault: boolean = true;
  public userId: string = '';
  public remarks: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<OrderFlowRequestDto>) {
    Object.assign(this, init);
  }
}
