import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFlowStageTransitionComponent } from './order-flow-stage-transition.component';

describe('OrderFlowStageTransitionComponent', () => {
  let component: OrderFlowStageTransitionComponent;
  let fixture: ComponentFixture<OrderFlowStageTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFlowStageTransitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFlowStageTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
