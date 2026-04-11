import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BannerService } from './banner.service';
import {
  loadBanners,
  loadBannersFailure,
  loadBannersSuccess,
} from './banner.action';

@Injectable()
export class BannerEffects {
  private actions$ = inject(Actions);
  private bannerService = inject(BannerService);

  loadBanners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBanners),
      switchMap(({ filter }) =>
        this.bannerService.getAllBanners(filter).pipe(
          map((banners) => loadBannersSuccess({ banners, filter })),
          catchError((error) =>
            of(
              loadBannersFailure({
                error: error?.message ?? 'Failed to load banners',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
