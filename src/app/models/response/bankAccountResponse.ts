import { BankCardSummaryResponse } from "./bank-card/bankCardSummaryResponse";
import { BankMovementSummaryResponse } from "./bank-movement/bankMovementSummaryResponse";

export interface BankAccountResponse {
  id: number,
  iban: string,
  balance: number,
  movements: BankMovementSummaryResponse[]
  cards: BankCardSummaryResponse[],
}