import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyToBuyHomeComponent } from './easy-to-buy-home.component';

describe('EasyToBuyHomeComponent', () => {
  let component: EasyToBuyHomeComponent;
  let fixture: ComponentFixture<EasyToBuyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasyToBuyHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyToBuyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
