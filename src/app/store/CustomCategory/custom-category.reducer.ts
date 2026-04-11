import { createReducer, on } from '@ngrx/store';
import {
  clearCustomCategories,
  loadCustomCategories,
  loadCustomCategoriesFailure,
  loadCustomCategoriesSuccess,
} from './custom-category.action';
import { CustomCategoryFilterDto } from '../../Model/CustomCategory';

export interface CustomCategoryState {
  customCategories: any[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  lastFilter: CustomCategoryFilterDto | null;
}

export const initialCustomCategoryState: CustomCategoryState = {
  customCategories: [],
  loading: false,
  loaded: false,
  error: null,
  lastFilter: null,
};

export const reducer = createReducer(
  initialCustomCategoryState,

  on(loadCustomCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadCustomCategoriesSuccess, (state, { customCategories, filter }) => ({
    ...state,
    customCategories,
    loading: false,
    loaded: true,
    error: null,
    lastFilter: filter,
  })),

  on(loadCustomCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(clearCustomCategories, () => initialCustomCategoryState),
);
