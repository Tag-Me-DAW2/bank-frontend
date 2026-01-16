import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PageInterface } from '../../models/pageInterface';
import { BankMovementSummaryResponse } from '../../models/response/bank-movement/bankMovementSummaryResponse';

@Injectable({
  providedIn: 'root',
})
export class CardService {
   httpClient = inject(HttpClient);
  url: string = 'http://localhost:8080/credit-cards';

  getMovementsByCardId(cardId: number) {
    return this.httpClient.get<PageInterface<BankMovementSummaryResponse>>(this.url + `/movements/${cardId}`);
  }
}
