import { createSelector } from '@ngrx/store';

import { brandFeature } from './brand.feature';
import { BrandFilterDto } from '../../Model/Brand';

export const selectBrands = brandFeature.selectBrands;
export const selectBrandLoading = brandFeature.selectLoading;
export const selectBrandError = brandFeature.selectError;
export const selectBrandLoaded = brandFeature.selectLoaded;
export const selectBrandLastFilter = brandFeature.selectLastFilter;

function isSameBrandFilter(
  a: BrandFilterDto | null,
  b: BrandFilterDto | null,
): boolean {
  if (!a || !b) return false;

  return a.companyId === b.companyId && a.isActive === b.isActive;
}

export const selectShouldLoadBrands = (filter: BrandFilterDto) =>
  createSelector(
    selectBrandLoaded,
    selectBrands,
    selectBrandLastFilter,
    (loaded, brands, lastFilter) => {
      if (!loaded) return true;
      if (!brands.length) return true;
      if (!lastFilter) return true;

      return !isSameBrandFilter(lastFilter, filter);
    },
  );

export const selectMappedBrands = createSelector(selectBrands, (brands) =>
  brands.map((x) => ({
    id: x.id,
    name: x.name,
    productCount: x.productCount,
    isChecked: false,
  })),
);
