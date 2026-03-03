import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAddressComponent } from './office-address.component';

describe('OfficeAddressComponent', () => {
  let component: OfficeAddressComponent;
  let fixture: ComponentFixture<OfficeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
