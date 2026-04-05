export class OrderDeliveryFilterRequestDto {
  public companyId: number = 0;
  public salesOrderId: number = 0;
  public deliveryProviderId: number = 0;
  public isActive: boolean = true;

  constructor(init?: Partial<OrderDeliveryFilterRequestDto>) {
    Object.assign(this, init);
  }
}

export class OrderDeliveryRequestDto {
  public companyId: number = 0;
  public salesOrderId: number = 0;
  public deliveryProviderId: number = 0;
  public riderId: number = 0;
  public trackingNo: string = '';
  public pickupAddress: string = '';
  public deliveryAddress: string = '';
  public pickupLatitude: number = 0;
  public pickupLongitude: number = 0;
  public deliveryLatitude: number = 0;
  public deliveryLongitude: number = 0;
  public distanceKm: number = 0;
  public weightKg: number = 0;
  public deliveryZoneId: number = 0;
  public shipmentStatus: number = 0;

  public assignedAt: Date = new Date();
  public pickupAt: Date = new Date();
  public dispatchAt: Date = new Date();
  public outForDeliveryAt: Date = new Date();
  public deliveredAt: Date = new Date();
  public failedAt: Date = new Date();
  public returnInitiatedAt: Date = new Date();

  public receiverName: string = '';
  public receiverPhone: string = '';
  public failureReason: string = '';
  public userId: string = '';
  public remarks: string = '';
  public isActive: boolean = true;

  constructor(init?: Partial<OrderDeliveryRequestDto>) {
    Object.assign(this, init);
  }
}
