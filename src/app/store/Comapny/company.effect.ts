import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CompanyService } from './company.service';
import {
  loadCompanyByCode,
  loadCompanyByCodeFailure,
  loadCompanyByCodeSuccess,
} from './company.action';

@Injectable()
export class CompanyEffects {
  private actions$ = inject(Actions);
  private companyService = inject(CompanyService);

  loadCompanyByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanyByCode),
      switchMap(({ code }) =>
        this.companyService.getCompanyByCode(code).pipe(
          map((company) =>
            loadCompanyByCodeSuccess({
              company,
              code,
            }),
          ),
          catchError((error) =>
            of(
              loadCompanyByCodeFailure({
                error: error?.message ?? 'Failed to load company',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
