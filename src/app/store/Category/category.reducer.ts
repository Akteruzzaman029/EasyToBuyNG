// category.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadCategoryTreeApi,
  loadCategoryTreeSuccess,
  loadCategoryTreeFailure,
  setCategoryTreeLoading,
} from './category.action';

export interface CategoryTreeState {
  categorytree: any[];
  loading: boolean;
  error: string | null;
}

export const initialCategoryTreeState: CategoryTreeState = {
  categorytree: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialCategoryTreeState,

  on(loadCategoryTreeApi, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadCategoryTreeSuccess, (state, { categoryTree }) => ({
    ...state,
    categorytree: categoryTree,
    loading: false,
    error: null,
  })),

  on(loadCategoryTreeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(setCategoryTreeLoading, (state, { isLoading }) => ({
    ...state,
    loading: isLoading,
  }))
);