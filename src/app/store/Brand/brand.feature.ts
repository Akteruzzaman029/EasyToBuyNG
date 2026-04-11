import { createFeature } from '@ngrx/store';
import { reducer } from './brand.reducer';

export const brandFeature = createFeature({
  name: 'brand',
  reducer,
});