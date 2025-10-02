import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayTypeComponent } from './payment-gateway-type.component';

describe('PaymentGatewayTypeComponent', () => {
  let component: PaymentGatewayTypeComponent;
  let fixture: ComponentFixture<PaymentGatewayTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentGatewayTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGatewayTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
