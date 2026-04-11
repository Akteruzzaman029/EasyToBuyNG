import { createSelector } from '@ngrx/store';
import { bannerFeature } from './banner.feature';
import { BannerFilterRequestDto } from '../../Model/Banner';

export const selectBanners = bannerFeature.selectBanners;
export const selectBannerLoading = bannerFeature.selectLoading;
export const selectBannerError = bannerFeature.selectError;
export const selectBannerLoaded = bannerFeature.selectLoaded;
export const selectBannerLastFilter = bannerFeature.selectLastFilter;

function isSameBannerFilter(
  a: BannerFilterRequestDto | null,
  b: BannerFilterRequestDto | null,
): boolean {
  if (!a || !b) return false;

  return a.companyId === b.companyId && a.isActive === b.isActive;
}

export const selectShouldLoadBanners = (filter: BannerFilterRequestDto) =>
  createSelector(
    selectBannerLoaded,
    selectBanners,
    selectBannerLastFilter,
    (loaded, banners, lastFilter) => {
      if (!loaded) return true;
      if (!banners.length) return true;
      if (!lastFilter) return true;

      return !isSameBannerFilter(lastFilter, filter);
    },
  );

export const selectHomeSliderList = createSelector(selectBanners, (banners) =>
  banners.filter((x) => x.typeTag === 'home_slider'),
);

export const selectHomeTopList = createSelector(selectBanners, (banners) =>
  banners.filter((x) => x.typeTag === 'home_top'),
);

export const selectHomeMiddleList = createSelector(selectBanners, (banners) =>
  banners.filter((x) => x.typeTag === 'home_middle'),
);
