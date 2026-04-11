import { createFeature } from '@ngrx/store';
import { reducer } from './banner.reducer';

export const bannerFeature = createFeature({
  name: 'banner',
  reducer,
});