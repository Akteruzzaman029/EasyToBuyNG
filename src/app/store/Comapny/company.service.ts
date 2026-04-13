import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private http = inject(HttpHelperService);

  getCompanyByCode(code: string): Observable<any> {
    return this.http.Get<any>(`Company/GetCompanyByCode/${code}`);
  }
}
