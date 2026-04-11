import { createFeature } from '@ngrx/store';
import { reducer } from './custom-category.reducer';

export const customCategoryFeature = createFeature({
  name: 'customCategory',
  reducer,
});