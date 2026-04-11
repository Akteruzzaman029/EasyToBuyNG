import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  FileOutline,
  MinusSquareOutline,
  PlusSquareOutline,
} from '@ant-design/icons-angular/icons';
import { counterFeature } from './store/Counter/counter.feature';
import { fromFeature } from './store/from/from.feature';
import { CategoryEffects } from './store/Category/category.effect';
import { categoryTreeFeature } from './store/Category/category.feature';
import { bannerFeature } from './store/Banner/banner.feature';
import { customCategoryFeature } from './store/CustomCategory/custom-category.feature';
import { CustomCategoryEffects } from './store/CustomCategory/custom-category.effect';
import { BannerEffects } from './store/Banner/banner.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimizes zone-based change detection
    provideRouter(
      routes,
      withComponentInputBinding(), // Enables component input binding in routing
      withHashLocation(), // Enables HashLocationStrategy for hash-based routing
    ), // Provides the routing configuration
    provideHttpClient(), // Use fetch API for HTTP requests
    provideAnimations(), // Required for animations in the app
    provideToastr({
      timeOut: 3000, // Toast duration
      positionClass: 'toast-bottom-right', // Position of toast notifications
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    provideNzIcons([FileOutline, MinusSquareOutline, PlusSquareOutline]),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }), // Provides Toastr for showing notifications
    provideStore({
      [categoryTreeFeature.name]: categoryTreeFeature.reducer,
       [bannerFeature.name]: bannerFeature.reducer,
      [customCategoryFeature.name]: customCategoryFeature.reducer,
    }),
    provideState(counterFeature), // Registers the counter feature with the store
    provideState(fromFeature), // Registers the counter feature with the store
    provideEffects(CategoryEffects,BannerEffects, CustomCategoryEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      connectInZone: true,
    }),
  ],
};
