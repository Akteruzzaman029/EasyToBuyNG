import { createSelector } from '@ngrx/store';
import { customCategoryFeature } from './custom-category.feature';
import { CustomCategoryFilterDto } from '../../Model/CustomCategory';

export const selectCustomCategories =
  customCategoryFeature.selectCustomCategories;
export const selectCustomCategoryLoading = customCategoryFeature.selectLoading;
export const selectCustomCategoryError = customCategoryFeature.selectError;
export const selectCustomCategoryLoaded = customCategoryFeature.selectLoaded;
export const selectCustomCategoryLastFilter =
  customCategoryFeature.selectLastFilter;

function isSameCustomCategoryFilter(
  a: CustomCategoryFilterDto | null,
  b: CustomCategoryFilterDto | null,
): boolean {
  if (!a || !b) return false;

  return (
    a.companyId === b.companyId &&
    a.categoryId === b.categoryId &&
    a.isActive === b.isActive
  );
}

export const selectShouldLoadCustomCategories = (
  filter: CustomCategoryFilterDto,
) =>
  createSelector(
    selectCustomCategoryLoaded,
    selectCustomCategories,
    selectCustomCategoryLastFilter,
    (loaded, customCategories, lastFilter) => {
      if (!loaded) return true;
      if (!customCategories.length) return true;
      if (!lastFilter) return true;

      return !isSameCustomCategoryFilter(lastFilter, filter);
    },
  );
