export class OrderFlowStageFilterRequestDto {
  public name: string = '';
  public code: string = '';
  public sequenceNo: number = 0;
  public isActive: boolean = true;

  constructor(init?: Partial<OrderFlowStageFilterRequestDto>) {
    Object.assign(this, init);
  }
}

export class OrderFlowStageRequestDto {
  public orderFlowId: number = 0;
  public name: string = '';
  public code: string = '';
  public sequenceNo: number = 0;
  public isInitialStage: boolean = true;
  public isFinalStage: boolean = true;
  public customerVisible: boolean = true;
  public colorCode: string = '';
  public icon: string = '';
  public userId: string = '';
  public remarks: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<OrderFlowStageRequestDto>) {
    Object.assign(this, init);
  }
}
