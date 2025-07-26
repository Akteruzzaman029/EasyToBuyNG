import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartItemComponent } from './add-to-cart-item.component';

describe('AddToCartItemComponent', () => {
  let component: AddToCartItemComponent;
  let fixture: ComponentFixture<AddToCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCartItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
