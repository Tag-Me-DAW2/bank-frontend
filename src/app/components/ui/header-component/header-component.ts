import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['bank/login']);
  }
}
