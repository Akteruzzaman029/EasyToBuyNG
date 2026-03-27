import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoayalityPointComponent } from './loayality-point.component';

describe('LoayalityPointComponent', () => {
  let component: LoayalityPointComponent;
  let fixture: ComponentFixture<LoayalityPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoayalityPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoayalityPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
