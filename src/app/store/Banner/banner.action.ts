import { createAction, props } from '@ngrx/store';
import { BannerFilterRequestDto } from '../../Model/Banner';

export const loadBanners = createAction(
  '[Banner] Load Banners',
  props<{ filter: BannerFilterRequestDto }>(),
);

export const loadBannersSuccess = createAction(
  '[Banner] Load Banners Success',
  props<{
    banners: any[];
    filter: BannerFilterRequestDto;
  }>(),
);

export const loadBannersFailure = createAction(
  '[Banner] Load Banners Failure',
  props<{ error: string }>(),
);

export const clearBanners = createAction('[Banner] Clear Banners');
