import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoayalityProgramComponent } from './loayality-program.component';

describe('LoayalityProgramComponent', () => {
  let component: LoayalityProgramComponent;
  let fixture: ComponentFixture<LoayalityProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoayalityProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoayalityProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
