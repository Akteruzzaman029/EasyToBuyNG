import { createAction, props } from '@ngrx/store';
import { CustomCategoryFilterDto } from '../../Model/CustomCategory';

export const loadCustomCategories = createAction(
  '[Custom Category] Load Custom Categories',
  props<{ filter: CustomCategoryFilterDto }>(),
);

export const loadCustomCategoriesSuccess = createAction(
  '[Custom Category] Load Custom Categories Success',
  props<{
    customCategories: any[];
    filter: CustomCategoryFilterDto;
  }>(),
);

export const loadCustomCategoriesFailure = createAction(
  '[Custom Category] Load Custom Categories Failure',
  props<{ error: string }>(),
);

export const clearCustomCategories = createAction(
  '[Custom Category] Clear Custom Categories',
);
