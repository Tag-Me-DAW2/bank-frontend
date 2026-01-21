import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccountResponse } from '../../models/response/bankAccountResponse';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  httpClient: HttpClient = inject(HttpClient);
  url: string = 'http://bank-back-tagme.preproducciondaw.cip.fpmislata.com/bank-accounts/client';

  getAccountsByUserId(userId: number): Observable<BankAccountResponse[]> {
    return this.httpClient.get<BankAccountResponse[]>(`${this.url}/${userId}`);
  }

  getAccountById(accountId: number): Observable<BankAccountResponse> {
    return this.httpClient.get<BankAccountResponse>(
      `http://bank-back-tagme.preproducciondaw.cip.fpmislata.com/bank-accounts/${accountId}`,
    );
  }
}
