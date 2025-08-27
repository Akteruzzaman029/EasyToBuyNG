import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRegistrationComponent } from './general-registration.component';

describe('GeneralRegistrationComponent', () => {
  let component: GeneralRegistrationComponent;
  let fixture: ComponentFixture<GeneralRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
