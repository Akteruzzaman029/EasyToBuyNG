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
    debugger;
    if (!this.selectedDistrictName || !this.selectedAreaName || !this.streetAddress) {
      this.toast.error('Fill all required fields');
      return;
    }
    const userJson = localStorage.getItem("UserResponseDto");
    const user = userJson ? JSON.parse(userJson) : null;

    const payload = {
      userId: user ? user.userId : null,
      pickerName: this.userName,
      pickerNumber: "",
      streetAddress: this.streetAddress,
      building: "",
      city: this.selectedDistrictName,
      state: this.selectedAreaName,
      zipCode: "",
      isDefault: true,
      remarks: "manual_entry",
      isActive: true
    };

    this.http.Post(`Address/InsertAddress`, payload).subscribe({
      next: (res: any) => {
        this.toast.success('Address saved successfully');
        this.onCloseForm();
      },
      error: (err) => {
        this.toast.error('Error saving address');
        console.error(err);
      }
    });
  }

  getAddressList(page: number = 1) {
    debugger
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
