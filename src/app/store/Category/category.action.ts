// category.actions.ts
import { createAction, props } from '@ngrx/store';
import { CategoryFilterRequestDto } from '../../Model/Category';

export const loadCategoryTree = createAction(
  '[Category] Load Category Tree', 
  props<{ filter: CategoryFilterRequestDto }>()  // Adding filter as a payload
);

export const loadCategoryTreeApi = createAction('[Category] Load Category Tree API');

export const loadCategoryTreeSuccess = createAction(
  '[Category] Load Category Tree Success',
  props<{ categoryTree: any[] }>()
);

export const loadCategoryTreeFailure = createAction(
  '[Category] Load Category Tree Failure',
  props<{ error: string }>()
);

export const setCategoryTreeLoading = createAction(
  '[Category] Set Category Tree Loading',
  props<{ isLoading: boolean }>()
);