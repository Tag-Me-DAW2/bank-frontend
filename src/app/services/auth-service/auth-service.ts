import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  url = 'http://localhost:8080/auth';

  login(username: string, password: string) {
    const loginData = { username, password };
    return this.httpClient.post(`${this.url}/login`, loginData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.clientResponse));
      })
    );
  }

  logout() {
    const token = localStorage.getItem('token');
    this.httpClient.post(`${this.url}/logout`, token).subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    });
  }
}
