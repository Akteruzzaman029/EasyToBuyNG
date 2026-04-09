import { createAction, props } from '@ngrx/store';

export const updateFromField = createAction(
  '[From] Update Field',
  props<{ field: 'name' | 'email'; value: string }>(),
);

export const resetFrom = createAction('[From] Reset');
