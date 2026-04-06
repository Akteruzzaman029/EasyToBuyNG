import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChargeAdjustmentComponent } from './order-charge-adjustment.component';

describe('OrderChargeAdjustmentComponent', () => {
  let component: OrderChargeAdjustmentComponent;
  let fixture: ComponentFixture<OrderChargeAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderChargeAdjustmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderChargeAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
