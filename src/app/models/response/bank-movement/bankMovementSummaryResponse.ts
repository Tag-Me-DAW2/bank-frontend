export interface BankMovementSummaryResponse {
  id: string,
  amount: number,
  date: Date,
  movementType: 'DEPOSIT' | 'WITHDRAWAL',
  movementSource: 'BANK_ACCOUNT' | 'BANK_CARD' | 'DOMICILIATION' 
}