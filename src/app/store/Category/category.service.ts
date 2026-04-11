import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { CategoryFilterRequestDto } from '../../Model/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpHelperService);

  getCategoryTree(filter: CategoryFilterRequestDto): Observable<any[]> {
    return this.http.Post<any[]>('Category/GetCategoryTree', filter);
  }

  getAllCategories(filter: CategoryFilterRequestDto): Observable<any[]> {
    return this.http.Post<any[]>('Category/GetAllCategories', filter);
  }
}
