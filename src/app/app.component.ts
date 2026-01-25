import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonHelper } from './Shared/Service/common-helper.service';
import { NotificationService } from './Shared/Service/notification.service';
import { HttpHelperService } from './Shared/Service/http-helper.service';
import { AuthService } from './Shared/Service/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DatePipe, CommonHelper,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppComponent implements OnInit {
  private notification = inject(NotificationService);
  private http = inject(HttpHelperService);
  private auth = inject(AuthService);
  title = 'E-commerce';
  domain: string = "";
  ngOnInit() {
    debugger
    this.domain = window.location.host;
    if (this.auth.getItem("Company") == null) {
      this.GetCompanyByCode();
    }
    this.notification.startConnection();
  }


  private GetCompanyByCode() {
    this.http.Get(`Company/GetCompanyByCode/${this.domain}`).subscribe(
      (res: any) => {
        this.auth.setItem("Company", res.id);
      },
      (err) => {
        console.log(err)
      }
    );
  }

}
