import {
  CommonModule,
  DatePipe,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonHelper } from './Shared/Service/common-helper.service';
import { NotificationService } from './Shared/Service/notification.service';
import { AuthService } from './Shared/Service/auth.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadCompanyByCode } from './store/Comapny/company.action';
import {
  selectCompany,
  selectCompanyError,
  selectShouldLoadCompanyByCode,
} from './store/Comapny/company.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmService } from './Shared/Service/ConfirmService';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    DatePipe,
    CommonHelper,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
})
export class AppComponent implements OnInit {
  private notification = inject(NotificationService);
  private auth = inject(AuthService);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  title = 'E-commerce';
  domain: string = '';

  modalTitle = '';
  modalMessage = '';
  private confirmCallback: any;
  
  ngOnInit() {
    this.domain = window.location.host;
    this.GetCompanyByCode();

    this.store
      .select(selectCompany)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        if (res?.id) {
          this.auth.setItem('Company', res.id);
        }
      });

    this.store
      .select(selectCompanyError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((err) => {
        if (err) {
          console.log(err);
        }
      });
    this.notification.startConnection();
  }

  private GetCompanyByCode(): void {
    this.store
      .select(selectShouldLoadCompanyByCode(this.domain))
      .pipe(take(1))
      .subscribe((shouldLoad) => {
        if (shouldLoad) {
          this.store.dispatch(loadCompanyByCode({ code: this.domain }));
        }
      });
  }

  constructor(private confirmService: ConfirmService) {
    this.confirmService.confirmState.subscribe(state => {
      this.modalTitle = state.title;
      this.modalMessage = state.message;
      this.confirmCallback = state.onConfirm;
    });
  }

  executeAction() {
    if (this.confirmCallback) {
      this.confirmCallback();  
      document.getElementById("closeCommonDelete")?.click();  
    }
  }
}
