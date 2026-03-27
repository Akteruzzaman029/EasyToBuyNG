import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EVouchersComponent } from './evouchers.component';

describe('EVouchersComponent', () => {
  let component: EVouchersComponent;
  let fixture: ComponentFixture<EVouchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EVouchersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
