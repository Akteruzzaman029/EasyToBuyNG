import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Shared/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-address.component.html',
  styleUrl: './my-address.component.scss'
})
export class MyAddressComponent {
  showAddressForm: boolean = false;
  public selectedDistrictName: string = '';
  public selectedAreaName: string = '';
  public userName: string = '';
  public streetAddress: string = '';
  public addressList: any[] = [];
  public isEditMode: boolean = false;
  public selectedAddressId: number | null = null;

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAddressList();
  }

  onSaveAddress() {
    
    if (!this.selectedDistrictName || !this.selectedAreaName || !this.streetAddress) {
      this.toast.error('Fill all required fields');
      return;
    }

    const userJson = localStorage.getItem("UserResponseDto");
    const user = userJson ? JSON.parse(userJson) : null;

    const payload = {
      id: this.isEditMode ? this.selectedAddressId : 0,  
      userId: user ? user.userId : null,
      pickerName: this.userName,
      streetAddress: this.streetAddress,
      city: this.selectedDistrictName,
      state: this.selectedAreaName,
      isDefault: true,
      isActive: true
    };

    const url = this.isEditMode ? `Address/UpdateAddress/${this.selectedAddressId}` : `Address/InsertAddress`;

    this.http.Post(url, payload).subscribe({
      next: (res: any) => {
        this.toast.success(this.isEditMode ? 'Updated successfully' : 'Saved successfully');
        this.getAddressList();  
        this.onCloseForm();
      },
      error: (err) => {
        this.toast.error('Error saving address');
      }
    });
  }

  onEditAddress(addr: any) {
    
    this.isEditMode = true;
    this.showAddressForm = true;
    this.selectedAddressId = addr.id;

    this.userName = addr.userName;
    this.streetAddress = addr.streetAddress;
    this.selectedDistrictName = addr.city;
    this.selectedAreaName = addr.state;
  }

  getAddressList(page: number = 1) {
    
    const userJson = localStorage.getItem("UserResponseDto");
    const user = userJson ? JSON.parse(userJson) : null;
    const userId = user ? user.userId : null;
    const userName = user ? user.userName : null;

    if (!userId) return;

    const searchModel = {
      userId: userId,
      isActive: true
    };

    const url = `Address/GetAddress?pageNumber=${page}`;

    this.http.Post(url, searchModel).subscribe({
      next: (res: any) => {
        if (res && res.items) {
          this.addressList = res.items.map((item: any) => {
            return {
              ...item,
              userName: userName
            };
          });
        } else {
          this.addressList = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading addresses:", err);
      }
    });
  }

  onAddAddressClick() {
    this.showAddressForm = true;
  }

  onCloseForm() {
    this.showAddressForm = false;
  }
}
