import { createReducer, on } from '@ngrx/store';
import {
  clearBanners,
  loadBanners,
  loadBannersFailure,
  loadBannersSuccess
} from './banner.action';
import { BannerFilterRequestDto } from '../../Model/Banner';

export interface BannerState {
  banners: any[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  lastFilter: BannerFilterRequestDto | null;
}

export const initialBannerState: BannerState = {
  banners: [],
  loading: false,
  loaded: false,
  error: null,
  lastFilter: null,
};

export const reducer = createReducer(
  initialBannerState,

  on(loadBanners, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadBannersSuccess, (state, { banners, filter }) => ({
    ...state,
    banners,
    loading: false,
    loaded: true,
    error: null,
    lastFilter: filter,
  })),

  on(loadBannersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(clearBanners, () => initialBannerState)
);