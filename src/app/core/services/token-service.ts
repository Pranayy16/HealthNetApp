import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'healthnet_token';

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  isTokenPresent(): boolean {
    return !!this.getToken();
  }

  decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  }

  getUserRole(): string | null {
    const decoded = this.decodeToken();
    if (!decoded) return null;
    // .NET JwtSecurityTokenHandler emits role under the full schema URI by default.
    const dotnetRoleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const claim = decoded[dotnetRoleClaim] ?? decoded.role ?? decoded.roles;
    if (Array.isArray(claim)) return claim[0] ?? null;
    return claim ?? null;
  }

  getUserId(): string | null {
    const decoded = this.decodeToken();
    const nameIdClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
    return decoded?.[nameIdClaim] ?? decoded?.sub ?? decoded?.userId ?? null;
  }
}
