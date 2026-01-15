import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BankAccountResponse } from '../../../models/response/bankAccountResponse';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { EmblaSlider } from '../../ui/embla-slider/embla-slider';
import { StatsPage } from "../stats-page/stats-page";
import { BankAccountService } from '../../../services/bank-account-service/bank-account-service';
import { ActivatedRoute, RouterLink } from "@angular/router";


@Component({
  selector: 'app-profile-page',
  imports: [CurrencyPipe, DatePipe, EmblaSlider, StatsPage, RouterLink, NgClass],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  bankAccountService = inject(BankAccountService);
  activatedRoute = inject(ActivatedRoute);

  accounts!: BankAccountResponse[];
  selectedAccount!: BankAccountResponse;

  ngOnInit() {
    const clientId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');

    if (clientId) {
      this.bankAccountService.getAccountsByUserId(clientId).subscribe({
        next: (accounts) => {
          this.accounts = accounts;
          console.log(accounts);

          this.selectedAccount = this.accounts[0];
        }
      });
    }
  }

  onAccountSelected(itemIndex: number) {
    this.selectedAccount = this.accounts[itemIndex];
  }
}
