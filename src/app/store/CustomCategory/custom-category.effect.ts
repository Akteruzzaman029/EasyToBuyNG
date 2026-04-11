import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CustomCategoryService } from './custom-category.service';
import {
  loadCustomCategories,
  loadCustomCategoriesFailure,
  loadCustomCategoriesSuccess,
} from './custom-category.action';

@Injectable()
export class CustomCategoryEffects {
  private actions$ = inject(Actions);
  private customCategoryService = inject(CustomCategoryService);

  loadCustomCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCustomCategories),
      switchMap(({ filter }) =>
        this.customCategoryService.getAllCustomCategories(filter).pipe(
          map((customCategories) =>
            loadCustomCategoriesSuccess({ customCategories, filter }),
          ),
          catchError((error) =>
            of(
              loadCustomCategoriesFailure({
                error: error?.message ?? 'Failed to load custom categories',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
