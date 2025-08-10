import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUpdated$ = new BehaviorSubject<void>(undefined);

  constructor() { }

  // ✅ Method to trigger cart update
  notifyCartUpdated(): void {
    this.cartUpdated$.next(); // emit an update
  }

  // ✅ Expose as observable to components
  onCartUpdated(): Observable<void> {
    return this.cartUpdated$.asObservable();
  }
  

  public getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  public setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  public getOrCreateGuestId(): string {
    let guestId = this.getCookie('guest_id');
    if (!guestId) {
      guestId = crypto.randomUUID(); // Or import from 'uuid'
      this.setCookie('guest_id', guestId, 30); // 30 days
    }
    return guestId;
  }
}
