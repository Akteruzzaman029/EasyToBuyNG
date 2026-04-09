import { createReducer, on } from '@ngrx/store';
import { resetFrom, updateFromField } from './from.action';

export interface FromState {
  name: string;
  email: string;
}

export const initialFromState: FromState = {
  name: '',
  email: '',
};

export const reducer = createReducer(
  initialFromState,
  on(updateFromField, (state, { field, value }) => ({
    ...state,
    [field]: value,
  })),
  on(resetFrom, () => initialFromState)
);
