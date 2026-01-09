import { BankCardSummaryResponse } from "./bank-card/bankCardSummaryResponse";
import { BankMovementSummaryResponse } from "./bank-movement/bankMovementSummaryResponse";

export interface BankAccountResponse {
  id: string,
  balance: number,
  iban: string,
  bankCards: BankCardSummaryResponse[],
  bankMovements: BankMovementSummaryResponse[]
}