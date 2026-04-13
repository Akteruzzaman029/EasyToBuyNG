import { createAction, props } from '@ngrx/store';

export const loadCompanyByCode = createAction(
  '[Company] Load Company By Code',
  props<{ code: string }>()
);

export const loadCompanyByCodeSuccess = createAction(
  '[Company] Load Company By Code Success',
  props<{ company: any; code: string }>()
);

export const loadCompanyByCodeFailure = createAction(
  '[Company] Load Company By Code Failure',
  props<{ error: string }>()
);

export const clearCompany = createAction(
  '[Company] Clear Company'
);