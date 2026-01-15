import { Component, inject } from '@angular/core';
import { BankMovementSummaryResponse } from '../../../models/response/bank-movement/bankMovementSummaryResponse';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BankAccountResponse } from '../../../models/response/bankAccountResponse';
import { BankMovementDetail } from '../../../models/response/bank-movement/bankMovementDetail';
import { A11yModule } from "@angular/cdk/a11y";
import { BankMovementsService } from '../../../services/bank-movements-service/bank-movements-service';
import { BankAccountService } from '../../../services/bank-account-service/bank-account-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientRespone } from '../../../models/response/ClientResponse';

@Component({
  selector: 'app-movements-page',
  imports: [CurrencyPipe, DatePipe, A11yModule, RouterLink],
  templateUrl: './movements-page.html',
  styleUrl: './movements-page.scss',
})
export class MovementsPage {
  bankMovementsService = inject(BankMovementsService);
  bankAccountsService = inject(BankAccountService);
  activatedRoute = inject(ActivatedRoute);

  user: ClientRespone = JSON.parse(localStorage.getItem('user') || '{}');
  selectedMovements!: BankMovementDetail;;
  account: BankAccountResponse = {} as BankAccountResponse;
  movements: BankMovementSummaryResponse[] = [];

  ngOnInit() {
    const accountId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '0');
    const movementId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('movementId') || '0');

    if (movementId) {
      this.onSelectedMovement(movementId);
    }

    if (accountId) {
      this.bankMovementsService.getMovementsByAccountId(accountId).subscribe({
        next: (movements) => {
          this.movements = movements.data;
          console.log(this.movements);

          this.bankAccountsService.getAccountById(accountId).subscribe({
            next: (account) => {
              this.account = account;
            }
          });
        }
      });
    }
  }

  onSelectedMovement(movementId: number) {
    this.bankMovementsService.getMovementById(movementId).subscribe({
      next: (movement) => {
        this.selectedMovements = movement;
        console.log(this.selectedMovements);
      }
    });
  }
}
