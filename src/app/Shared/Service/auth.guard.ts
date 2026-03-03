import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonHelper } from './common-helper.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let currentUser = CommonHelper.GetUser();
  if (!authService.isLogin()) {
    router.navigate(['/'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  if (route.data['roles'] && Array.isArray(route.data['roles'])) {
    const userRole = authService.GetCurrentUserRole();
    if (!userRole || !route.data['roles'].includes(userRole)) {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
};
