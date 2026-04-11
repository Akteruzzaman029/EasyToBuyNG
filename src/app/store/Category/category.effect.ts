import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from './category.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  loadCategoryTree,
  loadCategoryTreeFailure,
  loadCategoryTreeSuccess,
} from './category.action';

@Injectable()
export class CategoryEffects {
  private actions$ = inject(Actions);
  private categoryService = inject(CategoryService);

  loadCategoryTree$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategoryTree),
      switchMap(({ filter }) =>
        this.categoryService.getCategoryTree(filter).pipe(
          map((categoryTree) =>
            loadCategoryTreeSuccess({
              categoryTree,
              filter,
            }),
          ),
          catchError((error) =>
            of(
              loadCategoryTreeFailure({
                error: error?.message ?? 'Failed to load category tree',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  // NEW: load categories effect
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      switchMap(({ filter }) =>
        this.categoryService.getAllCategories(filter).pipe(
          map((categories) =>
            loadCategoriesSuccess({
              categories,
              filter,
            }),
          ),
          catchError((error) =>
            of(
              loadCategoriesFailure({
                error: error?.message ?? 'Failed to load categories',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
