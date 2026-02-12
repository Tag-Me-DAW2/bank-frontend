import { Component, inject, ViewChild } from '@angular/core';
import { BankAccountResponse } from '../../../models/response/bankAccountResponse';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { EmblaSlider } from '../../ui/embla-slider/embla-slider';
import { StatsPage } from '../stats-page/stats-page';
import { BankAccountService } from '../../../services/bank-account-service/bank-account-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../ui/header-component/header-component';
import { CardService } from '../../../services/card-service/card-service';
import { BankCardDetailResponse } from '../../../models/response/bank-card/bankCardDetailResponse';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  imports: [CurrencyPipe, DatePipe, EmblaSlider, StatsPage, RouterLink, NgClass, HeaderComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  bankAccountService = inject(BankAccountService);
  cardService = inject(CardService);
  activatedRoute = inject(ActivatedRoute);

  @ViewChild('cardSlider') cardSlider!: EmblaSlider;

  accounts!: BankAccountResponse[];
  selectedAccount!: BankAccountResponse;
  cardDetails: Map<number, BankCardDetailResponse> = new Map();
  flippedCards: Set<number> = new Set();

  ngOnInit() {
    const clientId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');

    if (clientId) {
      this.bankAccountService.getAccountsByUserId(clientId).subscribe({
        next: (accounts) => {
          this.accounts = accounts;
          console.log(accounts);

          this.selectedAccount = this.accounts[0];
          this.loadCardDetails();
        },
      });
    }
  }

  loadCardDetails() {
    const allCards = this.accounts.flatMap((account) => account.cards);
    if (allCards.length === 0) return;

    const cardRequests = allCards.map((card) => this.cardService.getCardById(card.id));

    forkJoin(cardRequests).subscribe({
      next: (details) => {
        details.forEach((detail) => {
          this.cardDetails.set(detail.id, detail);
        });
      },
    });
  }

  onAccountSelected(itemIndex: number) {
    this.selectedAccount = this.accounts[itemIndex];
    if (this.cardSlider) {
      this.cardSlider.scrollTo(0);
    }
  }

  toggleCardFlip(cardId: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.flippedCards.has(cardId)) {
      this.flippedCards.delete(cardId);
    } else {
      this.flippedCards.add(cardId);
    }
  }

  isCardFlipped(cardId: number): boolean {
    return this.flippedCards.has(cardId);
  }

  getCardDetail(cardId: number): BankCardDetailResponse | undefined {
    return this.cardDetails.get(cardId);
  }

  formatExpirationDate(date: string | undefined): string {
    if (!date) return 'MM/YY';
    // El backend ya envía el formato correcto MM/YY
    return date;
  }
}
