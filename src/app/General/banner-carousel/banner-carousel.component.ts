import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { CommonHelper } from '../../Shared/Service/common-helper.service';
import { loadBanners } from '../../store/Banner/banner.action';
import {
  selectHomeSliderList,
  selectBannerError,
  selectShouldLoadBanners,
} from '../../store/Banner/banner.selector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.scss',
})
export class BannerCarouselComponent implements OnInit, OnDestroy {
  public homeSliderList: any[] = [];
  currentIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  oBannerFilterRequestDto: any = {
    companyId: 0,
    isActive: true,
  };

  constructor(
    private http: HttpHelperService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.GetAllBanners();

    this.store
      .select(selectHomeSliderList)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.homeSliderList = res || [];
        this.currentIndex = 0;

        if (this.homeSliderList.length > 1) {
          this.startAutoPlay();
        } else {
          this.stopAutoPlay();
        }
      });

    this.store
      .select(selectBannerError)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((err) => {
        if (err) {
          this.toast.error(err, 'Error!!', { progressBar: true });
        }
      });
  }

  private GetAllBanners(): void {
    const filter = {
      ...this.oBannerFilterRequestDto,
      companyId: Number(CommonHelper.GetComapyId()),
      isActive: CommonHelper.booleanConvert(
        this.oBannerFilterRequestDto.isActive,
      ),
    };

    this.oBannerFilterRequestDto = filter;

    this.store
      .select(selectShouldLoadBanners(filter))
      .pipe(take(1))
      .subscribe((shouldLoad) => {
        if (shouldLoad) {
          this.store.dispatch(loadBanners({ filter }));
        }
      });
  }

  public GetImageUrl(fileId: number): string {
    return `${this.http.appUrl}UploadedFile/GetImage/${fileId}`;
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.restartAutoPlay();
  }

  nextSlide(): void {
    if (!this.homeSliderList.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.homeSliderList.length;
  }

  prevSlide(): void {
    if (!this.homeSliderList.length) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.homeSliderList.length) %
      this.homeSliderList.length;
  }

  onNextClick(): void {
    this.nextSlide();
    this.restartAutoPlay();
  }

  onPrevClick(): void {
    this.prevSlide();
    this.restartAutoPlay();
  }

  private startAutoPlay(): void {
    if (this.homeSliderList.length <= 1) return;

    this.stopAutoPlay();

    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  private stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private restartAutoPlay(): void {
    if (this.homeSliderList.length > 1) {
      this.startAutoPlay();
    }
  }
}