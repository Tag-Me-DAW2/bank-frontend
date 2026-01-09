export interface BankMovementDetail {
  id: string,
  amount: number,
  date: Date,
  description: string,
  movementType: 'DEPOSIT' | 'WITHDRAWAL',
  movementSource: 'BANK_ACCOUNT' | 'BANK_CARD' | 'DOMICILIATION',
}