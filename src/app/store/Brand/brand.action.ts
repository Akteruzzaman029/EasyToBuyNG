import { createAction, props } from '@ngrx/store';
import { BrandFilterDto } from '../../Model/Brand';

export const loadBrands = createAction(
  '[Brand] Load Brands',
  props<{ filter: BrandFilterDto }>(),
);

export const loadBrandsSuccess = createAction(
  '[Brand] Load Brands Success',
  props<{
    brands: any[];
    filter: BrandFilterDto;
  }>(),
);

export const loadBrandsFailure = createAction(
  '[Brand] Load Brands Failure',
  props<{ error: string }>(),
);

export const clearBrands = createAction('[Brand] Clear Brands');
