export class OrderFlowStageTransitionFilterDto {
  public flowId: number = 0;
  public fromStageId: number = 0;
  public toStageId: number = 0;
  public isAllowed: boolean = true;

  constructor(init?: Partial<OrderFlowStageTransitionFilterDto>) {
    Object.assign(this, init);
  }
}

export class OrderFlowStageTransitionRequestDto {
  public flowId: number = 0;
  public fromStageId: number = 0;
  public toStageId: number = 0;
  public isAllowed: boolean = true;
  public remarks: string = '';
  public userId: string = '';

  constructor(init?: Partial<OrderFlowStageTransitionRequestDto>) {
    Object.assign(this, init);
  }
}
