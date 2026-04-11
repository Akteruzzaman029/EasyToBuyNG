import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { BannerFilterRequestDto } from '../../Model/Banner';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private http = inject(HttpHelperService);

  getAllBanners(filter: BannerFilterRequestDto): Observable<any[]> {
    return this.http.Post<any[]>('Banner/GetAllBanners', filter);
  }
}
