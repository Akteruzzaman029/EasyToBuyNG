import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CategoryService } from './category.service';

import { catchError, map, switchMap, of } from 'rxjs';
import {
  loadCategoryTree,
  loadCategoryTreeSuccess,
  loadCategoryTreeFailure,
} from './category.action';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
  ) {}

  loadCategoryTree$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategoryTree),
      switchMap((action) => {
        return this.categoryService.getCategoryTree(action.filter).pipe(
          map((categoryTree) => loadCategoryTreeSuccess({ categoryTree })),
          catchError((error) =>
            of(
              loadCategoryTreeFailure({
                error: error.message || 'Failed to load category tree',
              }),
            ),
          ),
        );
      }),
    ),
  );
}
