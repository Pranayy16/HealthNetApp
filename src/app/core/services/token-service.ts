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
    console.log("Set token called in token service")
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

  getUserRole(): string {
    console.log("get user role called in token service")
    const decoded = this.decodeToken();
    console.log("Decoded token {getUserRole} : ",decoded);
    return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded?.role || decoded?.roles?.[0];
  }

  getUserId(): number {
    console.log("get user id called in token service")
    const decoded = this.decodeToken();
    return decoded?.sub || decoded?.userId;
  }

  getUserEmail(): string{
    const decoded = this.decodeToken();
    console.log("decoded data : ",decoded);
    console.log("Email : ",decoded?.Email);
    return decoded?.Email || decoded?.email;
  }

  
}
