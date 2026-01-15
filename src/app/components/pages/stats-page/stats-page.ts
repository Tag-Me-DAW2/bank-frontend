import { Component, inject, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { BankMovementSummaryResponse } from '../../../models/response/bank-movement/bankMovementSummaryResponse';
import { BankMovementsService } from '../../../services/bank-movements-service/bank-movements-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'stats-page',
  imports: [MatDatepickerModule, MatNativeDateModule, CurrencyPipe, DatePipe, NgClass, RouterLink],
  templateUrl: './stats-page.html',
  styleUrl: './stats-page.scss',
})
export class StatsPage implements OnInit, AfterViewInit, OnChanges {
  bankMovementsService = inject(BankMovementsService);
  cdr = inject(ChangeDetectorRef);

  @ViewChild('calendar') calendar!: MatCalendar<Date>;
  
  selectedDate: Date = new Date();
  monthlyMovements: BankMovementSummaryResponse[] = [];
  dailyMovements: BankMovementSummaryResponse[] = [];
  
  monthlyIncome: number = 0;
  monthlyExpenses: number = 0;
  expensesPercentage: number = 0;
  incomePercentage: number = 0;

  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  daysWithMovements: Set<string> = new Set();

  @Input() accountId!: number;

  dateClass = (date: Date): string => {
    return this.daysWithMovements.has(date.toDateString()) ? 'has-movements' : '';
  };

  ngOnInit() {
    this.loadMonthlyData();
    this.loadDailyMovements();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountId'] && !changes['accountId'].firstChange) {
      this.reloadData();
    }
  }

  ngAfterViewInit() {
    this.setupCalendarStateMonitoring();
  }

  private setupCalendarStateMonitoring() {
    if (this.calendar) {
      this.calendar.stateChanges.subscribe(() => {
        this.handleCalendarStateChange();
      });
    }
  }

  private handleCalendarStateChange() {
    const calendarActiveDate = this.calendar.activeDate;
    if (!calendarActiveDate) return;

    const calendarMonth = calendarActiveDate.getMonth();
    const calendarYear = calendarActiveDate.getFullYear();
    
    if (this.hasMonthOrYearChanged(calendarMonth, calendarYear)) {
      this.updateCurrentMonthAndYear(calendarMonth, calendarYear);
      this.updateSelectedDateForNewMonth(calendarMonth, calendarYear);
      this.reloadData();
    }
  }

  private hasMonthOrYearChanged(newMonth: number, newYear: number): boolean {
    return newMonth !== this.currentMonth || newYear !== this.currentYear;
  }

  private updateCurrentMonthAndYear(month: number, year: number) {
    this.currentMonth = month;
    this.currentYear = year;
  }

  private updateSelectedDateForNewMonth(month: number, year: number) {
    const currentDay = this.selectedDate.getDate();
    const daysInNewMonth = new Date(year, month + 1, 0).getDate();
    const validDay = Math.min(currentDay, daysInNewMonth);
    
    this.selectedDate = new Date(year, month, validDay);
  }

  private reloadData() {
    this.loadMonthlyData();
    this.loadDailyMovements();
  }

  onDateChange(date: Date | null) {
    if (!date) return;
    
    const previousMonth = this.currentMonth;
    const previousYear = this.currentYear;
    
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();

    this.selectedDate = date;
    
    if (previousMonth !== this.currentMonth || previousYear !== this.currentYear) {
      this.loadMonthlyData();
    }

    this.loadDailyMovements();
  }

  onMonthChange(date: Date) {
    this.updateDateAndReload(date);
  }

  private updateDateAndReload(date: Date) {
    const previousMonth = this.currentMonth;
    const previousYear = this.currentYear;
    
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    
    if (previousMonth !== this.currentMonth || previousYear !== this.currentYear) {
      const currentDay = this.selectedDate.getDate();
      const daysInNewMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const validDay = Math.min(currentDay, daysInNewMonth);
      
      this.selectedDate = new Date(this.currentYear, this.currentMonth, validDay);
      
      this.loadMonthlyData();
      this.loadDailyMovements();
    }
  }

  loadMonthlyData() {
    this.bankMovementsService.getMonthlySummaryByAccountIdAndDate(this.accountId, this.selectedDate).subscribe({
      next: (page) => {
        this.monthlyMovements = page.data;
        this.calculateMonthlyStats();
        this.updateDaysWithMovements();
      },
      error: (error) => {
        console.error('Error al cargar datos mensuales:', error);
      }
    });
  }

  private updateDaysWithMovements() {
    this.daysWithMovements.clear();
    
    this.monthlyMovements.forEach(movement => {
      const movementDate = new Date(movement.date);
      this.daysWithMovements.add(movementDate.toDateString());
    });
    
    this.dateClass = (date: Date): string => {
      return this.daysWithMovements.has(date.toDateString()) ? 'has-movements' : '';
    };
    
    this.cdr.detectChanges();
    
    setTimeout(() => {
      if (this.calendar) {
        this.calendar.updateTodaysDate();
        this.cdr.detectChanges();
      }
    }, 0);
  }

  loadDailyMovements() {
    this.bankMovementsService.getMonthlySummaryByAccountIdAndDate(this.accountId, this.selectedDate).subscribe({
      next: (page) => {
        this.dailyMovements = page.data.filter(movement => {
          return new Date(movement.date).toDateString() === this.selectedDate.toDateString();
        });
      },
      error: (error) => {
        console.error('Error al cargar movimientos del día:', error);
        this.dailyMovements = [];
      }
    });
  }

  calculateMonthlyStats() {
    this.monthlyIncome = this.monthlyMovements
      .filter(movement => movement.type === 'DEPOSIT')
      .reduce((sum, movement) => sum + movement.amount, 0);
    
    this.monthlyExpenses = this.monthlyMovements
      .filter(movement => movement.type === 'WITHDRAWAL')
      .reduce((sum, movement) => sum + movement.amount, 0);
    
    this.calculatePercentages();
  }

  private calculatePercentages() {
    const total = this.monthlyIncome + this.monthlyExpenses;
    
    if (total > 0) {
      this.expensesPercentage = Math.round((this.monthlyExpenses / total) * 100);
      this.incomePercentage = Math.round((this.monthlyIncome / total) * 100);
    } else {
      this.expensesPercentage = 0;
      this.incomePercentage = 0;
    }

    if (total > 0 && this.expensesPercentage === 0 && this.incomePercentage === 0) {
      if (this.monthlyExpenses > this.monthlyIncome) {
        this.expensesPercentage = 1;
      } else {
        this.incomePercentage = 1;
      }
    }
  }
}
