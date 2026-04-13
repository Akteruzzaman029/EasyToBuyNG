import { createFeature } from '@ngrx/store';
import { reducer } from './company.reducer';

export const companyFeature = createFeature({
  name: 'company',
  reducer,
});