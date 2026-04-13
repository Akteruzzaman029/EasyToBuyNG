import { createReducer, on } from '@ngrx/store';
import {
  clearCompany,
  loadCompanyByCode,
  loadCompanyByCodeFailure,
  loadCompanyByCodeSuccess,
} from './company.action';

export interface CompanyState {
  company: any | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  lastCode: string | null;
}

export const initialCompanyState: CompanyState = {
  company: null,
  loading: false,
  loaded: false,
  error: null,
  lastCode: null,
};

export const reducer = createReducer(
  initialCompanyState,

  on(loadCompanyByCode, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadCompanyByCodeSuccess, (state, { company, code }) => ({
    ...state,
    company,
    loading: false,
    loaded: true,
    error: null,
    lastCode: code,
  })),

  on(loadCompanyByCodeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(clearCompany, () => initialCompanyState),
);
