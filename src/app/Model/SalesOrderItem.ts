export class SalesOrderItemFilterRequestDto {
  public salesOrderId: number = 0;
  public productId: number = 0;
  public name: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<SalesOrderItemFilterRequestDto>) {
    Object.assign(this, init);
  }
}

export class SalesOrderItemRequestDto {
  public salesOrderId: number = 0;
  public productId: number = 0;
  public name: string = '';
  public quantity: number = 0;
  public unitPrice: number = 0;
  public discount: number = 0;
  public isFixedAmount: boolean = true;
  public vatAmount: number = 0;
  public lineTotal: number = 0;
  public netAmount: number = 0;
  public userId: string = '';
  public remarks: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<SalesOrderItemRequestDto>) {
    Object.assign(this, init);
  }
}
