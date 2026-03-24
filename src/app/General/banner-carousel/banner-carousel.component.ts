import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpHelperService } from '../../Shared/Service/http-helper.service';
@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-carousel.component.html',
  styleUrl: './banner-carousel.component.scss',
})
export class BannerCarouselComponent implements OnInit, OnDestroy {
  @Input() items: any[] = [];
  @Input() autoPlayInterval = 3000;

  currentIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private http: HttpHelperService) {}
  ngOnInit(): void {
    if (this.items.length > 1) {
      this.startAutoPlay();
    }
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
    if (!this.items.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prevSlide(): void {
    if (!this.items.length) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
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
    this.stopAutoPlay();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  private stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private restartAutoPlay(): void {
    if (this.items.length > 1) {
      this.startAutoPlay();
    }
  }
}
