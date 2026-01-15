import { BankCardSummaryResponse } from "../bank-card/bankCardSummaryResponse";

export interface BankMovementDetail {
  id: number,
  type: 'DEPOSIT' | 'WITHDRAWAL',
  origin: 'BANK_ACCOUNT' | 'BANK_CARD' | 'DOMICILIATION' 
  creditCard: BankCardSummaryResponse,
  date: Date,
  amount: number,
  concept: string
}