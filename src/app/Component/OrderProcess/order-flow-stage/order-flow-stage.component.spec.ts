import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFlowStageComponent } from './order-flow-stage.component';

describe('OrderFlowStageComponent', () => {
  let component: OrderFlowStageComponent;
  let fixture: ComponentFixture<OrderFlowStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFlowStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFlowStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
