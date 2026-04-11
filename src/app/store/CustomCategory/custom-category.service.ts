import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { CustomCategoryFilterDto } from '../../Model/CustomCategory';

@Injectable({
  providedIn: 'root',
})
export class CustomCategoryService {
  private http = inject(HttpHelperService);

  getAllCustomCategories(filter: CustomCategoryFilterDto): Observable<any[]> {
    return this.http.Post<any[]>(
      'CustomCategory/GetAllCustomCategories',
      filter,
    );
  }
}
