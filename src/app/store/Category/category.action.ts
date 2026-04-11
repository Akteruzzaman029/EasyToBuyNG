import { createAction, props } from '@ngrx/store';
import {  CategoryFilterRequestDto } from '../../Model/Category';

export const loadCategoryTree = createAction(
  '[Category] Load Category Tree',
  props<{ filter: CategoryFilterRequestDto }>()
);

export const loadCategoryTreeSuccess = createAction(
  '[Category] Load Category Tree Success',
  props<{
    categoryTree: any[];
    filter: CategoryFilterRequestDto;
  }>()
);

export const loadCategoryTreeFailure = createAction(
  '[Category] Load Category Tree Failure',
  props<{ error: string }>()
);

export const clearCategoryTree = createAction(
  '[Category] Clear Category Tree'
);

// NEW: category list actions
export const loadCategories = createAction(
  '[Category] Load Categories',
  props<{ filter: CategoryFilterRequestDto }>()
);

export const loadCategoriesSuccess = createAction(
  '[Category] Load Categories Success',
  props<{
    categories: any[];
    filter: CategoryFilterRequestDto;
  }>()
);

export const loadCategoriesFailure = createAction(
  '[Category] Load Categories Failure',
  props<{ error: string }>()
);
