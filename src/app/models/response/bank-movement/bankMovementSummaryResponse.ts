import { BankCardSummaryResponse } from '../bank-card/bankCardSummaryResponse';

export interface BankMovementSummaryResponse {
  id: number;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  origin: 'BANK_ACCOUNT' | 'BANK_CARD' | 'DOMICILIATION';
  date: Date;
  amount: number;
}
