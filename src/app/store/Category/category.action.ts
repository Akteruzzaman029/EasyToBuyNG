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