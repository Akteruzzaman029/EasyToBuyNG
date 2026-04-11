import { createSelector } from '@ngrx/store';
import { CategoryFilterRequestDto } from '../../Model/Category';
import { categoryTreeFeature } from './category.feature';

export const selectCategoryTree = categoryTreeFeature.selectCategoryTree;
export const selectCategoryTreeLoading = categoryTreeFeature.selectLoading;
export const selectCategoryTreeLoaded = categoryTreeFeature.selectLoaded;
export const selectCategoryTreeError = categoryTreeFeature.selectError;
export const selectLastCategoryFilter = categoryTreeFeature.selectLastFilter;

export const selectHasCategoryTreeData = createSelector(
  selectCategoryTree,
  (categoryTree) => categoryTree.length > 0
);

function isSameFilter(
  a: CategoryFilterRequestDto | null,
  b: CategoryFilterRequestDto | null
): boolean {
  if (!a || !b) return false;

  return (
    a.categoryId === b.categoryId &&
    a.parentCategoryId === b.parentCategoryId &&
    a.companyId === b.companyId &&
    a.isActive === b.isActive
  );
}

export const selectShouldLoadCategoryTree = (filter: CategoryFilterRequestDto) =>
  createSelector(
    selectCategoryTreeLoaded,
    selectHasCategoryTreeData,
    selectLastCategoryFilter,
    (loaded, hasData, lastFilter) => {
      if (!loaded) return true;
      if (!hasData) return true;
      if (!lastFilter) return true;

      return !isSameFilter(lastFilter, filter);
    }
  );