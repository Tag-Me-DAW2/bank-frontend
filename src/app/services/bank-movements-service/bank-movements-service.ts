import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BankMovementSummaryResponse } from '../../models/response/bank-movement/bankMovementSummaryResponse';
import { Observable } from 'rxjs';
import { PageInterface } from '../../models/pageInterface';
import { BankMovementDetail } from '../../models/response/bank-movement/bankMovementDetail';

@Injectable({
  providedIn: 'root',
})
export class BankMovementsService {
  httpClient = inject(HttpClient);
  url: string = 'http://bank-back-tagme.preproducciondaw.cip.fpmislata.com/movements';

  getMovementsByAccountId(
    accountId: number,
  ): Observable<PageInterface<BankMovementSummaryResponse>> {
    return this.httpClient.get<PageInterface<BankMovementSummaryResponse>>(
      this.url + `/account/${accountId}` + `?page=1&size=1000`,
    );
  }

  getMovementById(movementId: number): Observable<BankMovementDetail> {
    return this.httpClient.get<BankMovementDetail>(this.url + `/${movementId}`);
  }

  getMonthlySummaryByAccountIdAndDate(
    accountId: number,
    date: Date,
  ): Observable<PageInterface<BankMovementSummaryResponse>> {
    return this.httpClient.get<PageInterface<BankMovementSummaryResponse>>(this.url + '/monthly', {
      params: {
        accountId: accountId.toString(),
        date: date.toISOString().split('T')[0],
      },
    });
  }
}
