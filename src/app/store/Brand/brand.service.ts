import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { BrandFilterDto } from '../../Model/Brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private http = inject(HttpHelperService);

  getAllBrands(filter: BrandFilterDto): Observable<any[]> {
    return this.http.Post<any[]>('Brand/GetAllBrands', filter);
  }
}
