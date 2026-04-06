import { OrderItemRequestDto } from './OrderItem';

export class OrderFilterDto {
  constructor() {
    this.companyId = 0;
    this.startDate = new Date();
    this.endDate = new Date();
    this.userId = '';
    this.orderNo = '';
    this.orderStatus = 0;
    this.isActive = true;
  }
  public companyId: number;
  public startDate: Date;
  public endDate: Date;
  public userId: string;
  public orderNo: string;
  public orderStatus: number;
  public isActive: boolean;
}

export class OrderRequestDto {
  constructor() {
    this.addressId = 0;
    this.orderType = 0;
    this.companyId = 0;
    this.orderTypeId = 0;
    this.flowId = 0;
    this.currentStageId = 0;
    this.longitude = 0;
    this.latitude = 0;
    this.locationName = '';
    this.userId = '';
    this.orderNo = '';
    this.totalAmount = 0;
    this.totalDiscount = 0;
    this.orderStatus = 0;
    this.isActive = true;
    this.remarks = '';
    this.orderItems = [];
  }
  public addressId: number;
  public orderType: number;
  public companyId: number;
  public orderTypeId: number;
  public flowId: number;
  public currentStageId: number;
  public longitude: number;
  public latitude: number;
  public locationName: string;
  public userId: string;
  public orderNo: string;
  public totalAmount: number;
  public totalDiscount: number;
  public orderStatus: number;
  public remarks: string;
  public isActive: boolean;
  public orderItems: OrderItemRequestDto[];
}
