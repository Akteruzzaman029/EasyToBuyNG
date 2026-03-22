import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCategoryTreeComponent } from './common-category-tree.component';

describe('CommonCategoryTreeComponent', () => {
  let component: CommonCategoryTreeComponent;
  let fixture: ComponentFixture<CommonCategoryTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonCategoryTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
