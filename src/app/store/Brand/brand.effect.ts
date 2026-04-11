import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BrandService } from './brand.service';
import {
  loadBrands,
  loadBrandsFailure,
  loadBrandsSuccess,
} from './brand.action';

@Injectable()
export class BrandEffects {
  private actions$ = inject(Actions);
  private brandService = inject(BrandService);

  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBrands),
      switchMap(({ filter }) =>
        this.brandService.getAllBrands(filter).pipe(
          map((brands) => loadBrandsSuccess({ brands, filter })),
          catchError((error) =>
            of(
              loadBrandsFailure({
                error: error?.message ?? 'Failed to load brands',
              })
            )
          )
        )
      )
    )
  );
}