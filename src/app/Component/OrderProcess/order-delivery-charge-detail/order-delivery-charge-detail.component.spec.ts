import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryChargeDetailComponent } from './order-delivery-charge-detail.component';

describe('OrderDeliveryChargeDetailComponent', () => {
  let component: OrderDeliveryChargeDetailComponent;
  let fixture: ComponentFixture<OrderDeliveryChargeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDeliveryChargeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDeliveryChargeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
