import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { AuthService } from '../../Shared/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { Router } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule,JsonPipe],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.scss'
})
export class MyOrderComponent {
  public orderList = signal<any[]>([]);  
  public totalRecords: number = 0;

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private http: HttpHelperService,
    private router: Router,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(page: number = 1) {
    const userJson = localStorage.getItem("UserResponseDto");
    const user = userJson ? JSON.parse(userJson) : null;

    const searchModel = {
      userId: user ? user.userId : null,
      isActive: true
    };

    const url = `Order/GetOrder?pageNumber=${page}`;

    this.http.Post(url, searchModel).subscribe({
      next: (res: any) => {
        
        if (res && res.items) {
          this.orderList.set(res.items);
          this.totalRecords = res.totalRecords;
        } else {
          this.orderList.set([]);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading orders:", err);
      }
    });
  }
}
