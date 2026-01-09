import { Component, ElementRef, ViewChild } from '@angular/core';
import { BankAccountResponse } from '../../../models/response/bankAccountResponse';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EmblaSlider } from '../../ui/embla-slider/embla-slider';


@Component({
  selector: 'app-profile-page',
  imports: [CurrencyPipe, DatePipe, EmblaSlider],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {

  accounts: BankAccountResponse[] = [
    {
      id: '1',
      balance: 2500.50,
      iban: 'ES9121000418450200051332',
      bankCards: [
        {
          id: 'c1',
          cardNumber: '4532 **** **** 1234',
          cardHolderName: 'JUAN GARCIA LOPEZ'
        },
        {
          id: 'c2',
          cardNumber: '5425 **** **** 5678',
          cardHolderName: 'JUAN GARCIA LOPEZ'
        },
        {
          id: 'c2',
          cardNumber: '5425 **** **** 5678',
          cardHolderName: 'JUAN GARCIA LOPEZ'
        },
        {
          id: 'c2',
          cardNumber: '5425 **** **** 5678',
          cardHolderName: 'JUAN GARCIA LOPEZ'
        }
      ],
      bankMovements: [
        {
          id: 'm1',
          amount: 1500.00,
          date: new Date('2026-01-05'),
          movementType: 'DEPOSIT',
          movementSource: 'BANK_ACCOUNT'
        },
        {
          id: 'm2',
          amount: -50.25,
          date: new Date('2026-01-06'),
          movementType: 'WITHDRAWAL',
          movementSource: 'BANK_CARD'
        },
        {
          id: 'm3',
          amount: -120.00,
          date: new Date('2026-01-07'),
          movementType: 'WITHDRAWAL',
          movementSource: 'DOMICILIATION'
        },
        {
          id: 'm3',
          amount: -120.00,
          date: new Date('2026-01-07'),
          movementType: 'WITHDRAWAL',
          movementSource: 'DOMICILIATION'
        }
      ]
    },
    {
      id: '2',
      balance: 5750.25,
      iban: 'ES7921000813610123456789',
      bankCards: [
        {
          id: 'c3',
          cardNumber: '4916 **** **** 9012',
          cardHolderName: 'MARIA RODRIGUEZ SANCHEZ'
        }
      ],
      bankMovements: [
        {
          id: 'm4',
          amount: 3000.00,
          date: new Date('2026-01-02'),
          movementType: 'DEPOSIT',
          movementSource: 'BANK_ACCOUNT'
        },
        {
          id: 'm5',
          amount: -250.50,
          date: new Date('2026-01-04'),
          movementType: 'WITHDRAWAL',
          movementSource: 'BANK_CARD'
        },
        {
          id: 'm6',
          amount: 800.00,
          date: new Date('2026-01-06'),
          movementType: 'DEPOSIT',
          movementSource: 'BANK_ACCOUNT'
        },
        {
          id: 'm7',
          amount: -75.30,
          date: new Date('2026-01-08'),
          movementType: 'WITHDRAWAL',
          movementSource: 'BANK_CARD'
        }
      ]
    },
    {
      id: '1',
      balance: 2500.50,
      iban: 'ES9121000418450200051332',
      bankCards: [
        {
          id: 'c1',
          cardNumber: '4532 **** **** 1234',
          cardHolderName: 'JUAN GARCIA LOPEZ'
        },
        {
          id: 'c2',
          cardNumber: '5425 **** **** 5678',
          cardHolderName: 'JUAN GARCIA LOPEZ'
        },
        {
          id: 'c2',
          cardNumber: '5425 **** **** 5678',
          cardHolderName: 'JUAN GARCIA LOPEZ'
        },
        {
          id: 'c2',
          cardNumber: '5425 **** **** 5678',
          cardHolderName: 'JUAN GARCIA LOPEZ'
        }
      ],
      bankMovements: [
        {
          id: 'm1',
          amount: 1500.00,
          date: new Date('2026-01-05'),
          movementType: 'DEPOSIT',
          movementSource: 'BANK_ACCOUNT'
        },
        {
          id: 'm2',
          amount: -50.25,
          date: new Date('2026-01-06'),
          movementType: 'WITHDRAWAL',
          movementSource: 'BANK_CARD'
        },
        {
          id: 'm3',
          amount: -120.00,
          date: new Date('2026-01-07'),
          movementType: 'WITHDRAWAL',
          movementSource: 'DOMICILIATION'
        },
        {
          id: 'm3',
          amount: -120.00,
          date: new Date('2026-01-07'),
          movementType: 'WITHDRAWAL',
          movementSource: 'DOMICILIATION'
        }
      ]
    },
  ];
  selectedAccount: BankAccountResponse = this.accounts[0];

  onAccountSelected(itemIndex: number) {
    this.selectedAccount = this.accounts[itemIndex];
  }
}
