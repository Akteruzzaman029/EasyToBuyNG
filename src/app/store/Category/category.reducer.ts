import { createReducer, on } from '@ngrx/store';
import {
  clearCategoryTree,
  loadCategories,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  loadCategoryTree,
  loadCategoryTreeFailure,
  loadCategoryTreeSuccess,
} from './category.action';
import { CategoryFilterRequestDto } from '../../Model/Category';

export interface CategoryTreeState {
  categoryTree: any[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  lastFilter: CategoryFilterRequestDto | null;

  // NEW: category list
  categories: any[];
  categoryListLoading: boolean;
  categoryListLoaded: boolean;
  categoryListError: string | null;
  categoryListLastFilter: CategoryFilterRequestDto | null;
}

export const initialCategoryTreeState: CategoryTreeState = {
  categoryTree: [],
  loading: false,
  loaded: false,
  error: null,
  lastFilter: null,
  // category list
  categories: [],
  categoryListLoading: false,
  categoryListLoaded: false,
  categoryListError: null,
  categoryListLastFilter: null,
};

export const reducer = createReducer(
  initialCategoryTreeState,

  on(loadCategoryTree, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadCategoryTreeSuccess, (state, { categoryTree, filter }) => ({
    ...state,
    categoryTree,
    loading: false,
    loaded: true,
    error: null,
    lastFilter: filter,
  })),

  on(loadCategoryTreeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // NEW: category list
  on(loadCategories, (state) => ({
    ...state,
    categoryListLoading: true,
    categoryListError: null,
  })),

  on(loadCategoriesSuccess, (state, { categories, filter }) => ({
    ...state,
    categories,
    categoryListLoading: false,
    categoryListLoaded: true,
    categoryListError: null,
    categoryListLastFilter: filter,
  })),

  on(loadCategoriesFailure, (state, { error }) => ({
    ...state,
    categoryListLoading: false,
    categoryListError: error,
  })),

  on(clearCategoryTree, () => initialCategoryTreeState),
);
