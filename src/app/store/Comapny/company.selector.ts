import { createSelector } from '@ngrx/store';
import { companyFeature } from './company.feature';

export const selectCompany = companyFeature.selectCompany;
export const selectCompanyLoading = companyFeature.selectLoading;
export const selectCompanyLoaded = companyFeature.selectLoaded;
export const selectCompanyError = companyFeature.selectError;
export const selectLastCompanyCode = companyFeature.selectLastCode;

export const selectHasCompanyData = createSelector(
  selectCompany,
  (company) => !!company
);

export const selectShouldLoadCompanyByCode = (code: string) =>
  createSelector(
    selectCompanyLoaded,
    selectHasCompanyData,
    selectLastCompanyCode,
    (loaded, hasData, lastCode) => {
      if (!loaded) return true;
      if (!hasData) return true;
      if (!lastCode) return true;

      return lastCode !== code;
    }
  );