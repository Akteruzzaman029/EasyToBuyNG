import { createReducer, on } from '@ngrx/store';
import {
  clearCategoryTree,
  loadCategoryTree,
  loadCategoryTreeFailure,
  loadCategoryTreeSuccess,
} from './category.action';
import {  CategoryFilterRequestDto } from '../../Model/Category';

export interface CategoryTreeState {
  categoryTree: any[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  lastFilter: CategoryFilterRequestDto | null;
}

export const initialCategoryTreeState: CategoryTreeState = {
  categoryTree: [],
  loading: false,
  loaded: false,
  error: null,
  lastFilter: null,
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

  on(clearCategoryTree, () => initialCategoryTreeState)
);