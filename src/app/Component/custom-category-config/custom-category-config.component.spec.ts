import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCategoryConfigComponent } from './custom-category-config.component';

describe('CustomCategoryConfigComponent', () => {
  let component: CustomCategoryConfigComponent;
  let fixture: ComponentFixture<CustomCategoryConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCategoryConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCategoryConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
