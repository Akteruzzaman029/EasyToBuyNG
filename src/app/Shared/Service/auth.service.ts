import { Injectable, signal } from '@angular/core';
import { Subject, Observable, tap, catchError, throwError } from 'rxjs';
import { CommonHelper } from './common-helper.service';
import { HttpHelperService } from './http-helper.service';

export enum UserRole {
  GENERALUSER = 'GeneralUser',
  SYSTEMADMIN = 'SystemAdmin',
  ADMIN = 'Admin',
  NORMALUSER = 'NormalUser',
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public tokenSubject = new Subject<any>();
  public cartChange = new Subject<any>();
  public isLoginSubject = new Subject<any>();
  public searchParam = new Subject<any>();

  public screenType = signal<'mobile' | 'tablet' | 'desktop'>('desktop');
  constructor(private http: HttpHelperService) {
    this.updateScreenType();

    window.addEventListener('resize', () => {
      this.updateScreenType();
    });
  }

  public isLogin(): boolean {
    if (this.isLocalStorageAvailable()) {
      let token = localStorage.getItem('Token');
      return token == null ? false : true;
    }
    return false;
  }

  public isTokenExpired(token: any): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Date.now() / 1000;
  }

  public isRefreshTokenExpired(date: Date): boolean {
    const expireTime = new Date(date);
    const now = new Date().getTime(); // Get timestamp (ms)
    return expireTime.getTime() < now;
  }

  public GetCurrentUserRole(): string {
    try {
      let token = localStorage.getItem('Token');
      if (!token) {
        return 'NormalUser';
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    } catch (error) {
      return 'NormalUser';
    }
  }

  public isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && 'localStorage' in window;
  }

  public setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  public getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  public removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  public clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  refreshToken(): Observable<any> {
    let currentUser = CommonHelper.GetUser();
    const payload = {
      userId: currentUser?.userId,
      refreshToken: currentUser?.refreshToken,
    };
    return this.http.Login(`Auth/RefreshToken`, payload).pipe(
      tap((res: any) => {
        localStorage.setItem('Token', res.jwtToken);
        localStorage.setItem('UserResponseDto', JSON.stringify(res));
      }),
      catchError((error: any) => {
        console.log('refreshToken Error : ', error);
        return throwError(() => new Error(error));
      }),
    );
  }

  private updateScreenType(): void {
    const width = window.innerWidth;

    if (width < 768) {
      this.screenType.set('mobile');
    } else if (width >= 768 && width < 1024) {
      this.screenType.set('tablet');
    } else {
      this.screenType.set('desktop');
    }
  }

  isMobile(): boolean {
    return this.screenType() === 'mobile';
  }

  isTablet(): boolean {
    return this.screenType() === 'tablet';
  }

  isDesktop(): boolean {
    return this.screenType() === 'desktop';
  }

  // Method to get the screen width for responsive design (optional)
  getScreenWidth(): number {
    return window.innerWidth;
  }

  // Method to check if it's a mobile view (using a width threshold)
  isMobileView(): boolean {
    return this.getScreenWidth() <= 768; // Consider 768px or any custom breakpoint as mobile view
  }
}
