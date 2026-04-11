import { createReducer, on } from '@ngrx/store';
import {
  clearBrands,
  loadBrands,
  loadBrandsFailure,
  loadBrandsSuccess,
} from './brand.action';
import { BrandFilterDto } from '../../Model/Brand';

export interface BrandState {
  brands: any[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  lastFilter: BrandFilterDto | null;
}

export const initialBrandState: BrandState = {
  brands: [],
  loading: false,
  loaded: false,
  error: null,
  lastFilter: null,
};

export const reducer = createReducer(
  initialBrandState,

  on(loadBrands, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadBrandsSuccess, (state, { brands, filter }) => ({
    ...state,
    brands,
    loading: false,
    loaded: true,
    error: null,
    lastFilter: filter,
  })),

  on(loadBrandsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(clearBrands, () => initialBrandState),
);
