export class OrderTypeFilterDto {
  public name: string = '';
  public code: string = '';
  public companyId: number = 0;
  public isActive: boolean = true;

  constructor(init?: Partial<OrderTypeFilterDto>) {
    Object.assign(this, init);
  }
}

export class OrderTypeRequestDto {
  public name: string = '';
  public code: string = '';
  public companyId: number = 0;
  public userId: string = '';
  public remarks: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<OrderTypeRequestDto>) {
    Object.assign(this, init);
  }
}
