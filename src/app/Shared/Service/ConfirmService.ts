import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private confirmSubject = new Subject<any>();
  public confirmState = this.confirmSubject.asObservable();

  askConfirm(title: string, message: string, onConfirm: () => void) {
    this.confirmSubject.next({ title, message, onConfirm });
    document.getElementById("openCommonDeletes")?.click(); 
  }

  open(title: string, message: string, onConfirm: () => void) {
    this.confirmSubject.next({ title, message, onConfirm });
    document.getElementById("openCommonDelete")?.click();
  }
}