import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token-service';
import { AuthStateService } from './auth-state';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private authStateService: AuthStateService,
    private router: Router
  ) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        this.tokenService.setToken(response.token);
        this.authStateService.setLoggedIn(response.userId, response.role);
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.authStateService.setLoggedOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.tokenService.isTokenPresent() && !this.tokenService.isTokenExpired();
  }

  getUserRole(): string | null {
    return this.tokenService.getUserRole();
  }

  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }
}
