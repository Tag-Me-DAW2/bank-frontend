import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccountResponse } from '../../models/response/bankAccountResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  httpClient: HttpClient = inject(HttpClient);
  url: string = environment.apiUrl + '/bank-accounts';

  getAccountsByUserId(userId: number): Observable<BankAccountResponse[]> {
    return this.httpClient.get<BankAccountResponse[]>(`${this.url}/client/${userId}`);
  }

  getAccountById(accountId: number): Observable<BankAccountResponse> {
    return this.httpClient.get<BankAccountResponse>(`${this.url}/${accountId}`);
  }
}
