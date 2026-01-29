import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PageInterface } from '../../models/pageInterface';
import { BankMovementSummaryResponse } from '../../models/response/bank-movement/bankMovementSummaryResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  httpClient = inject(HttpClient);
  url: string = environment.apiUrl + '/credit-cards';

  getMovementsByCardId(cardId: number) {
    return this.httpClient.get<PageInterface<BankMovementSummaryResponse>>(
      this.url + `/movements/${cardId}`,
    );
  }
}
