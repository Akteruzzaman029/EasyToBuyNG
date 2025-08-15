import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutProcessComponent } from './check-out-process.component';

describe('CheckOutProcessComponent', () => {
  let component: CheckOutProcessComponent;
  let fixture: ComponentFixture<CheckOutProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOutProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
