import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../../models/register';
import { UpdateUser } from '../../models/UpdateUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiUrl;

  register(userData: User): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.apiBaseUrl}User/register`,userData);
  }

  getUserData(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiBaseUrl}User/`+id);
  }

  updateUserDate(id: number, userData: UpdateUser): Observable<RegisterResponse>{
    return this.http.put<RegisterResponse>(`${this.apiBaseUrl}User/update/${id}`,userData);
  }

  deleteUserAccount(id: number): Observable<any>{
    return this.http.patch<any>(`${this.apiBaseUrl}User/delete/${id}`,id);
  }
}
