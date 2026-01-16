import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(AuthService);
  router = inject(Router);

  @Input() username: string = '';
  @Input() password: string = '';

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.router.navigate(['bank/profile', user.id]);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
