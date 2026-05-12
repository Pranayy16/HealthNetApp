import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateOutbreakRequest,
  CreateOutbreakResponse,
  GetOutbreakResponse,
  OutbreakAnalyticsRequest,
  OutbreakAnalyticsResponse,
  UpdateOutbreakRequest,
  UpdateOutbreakResponse,
  DeleteOutbreakResponse
} from '../models/Outbreak';

@Injectable({
  providedIn: 'root'
})
export class OutbreakService {

  private baseUrl = 'http://localhost:5171/api/v1/OutbreakMonitoring';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('healthnet_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // POST api/v1/OutbreakMonitoring
  createOutbreak(request: CreateOutbreakRequest): Observable<CreateOutbreakResponse> {
    return this.http.post<CreateOutbreakResponse>(
      this.baseUrl,
      request,
      { headers: this.getHeaders() }
    );
  }

  // GET api/v1/OutbreakMonitoring/active
  getAllActiveOutbreaks(): Observable<GetOutbreakResponse[]> {
    return this.http.get<GetOutbreakResponse[]>(
      `${this.baseUrl}/active`,
      { headers: this.getHeaders() }
    );
  }

  // GET api/v1/OutbreakMonitoring/{id}
  getOutbreakById(id: number): Observable<GetOutbreakResponse> {
    return this.http.get<GetOutbreakResponse>(
      `${this.baseUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // PATCH api/v1/OutbreakMonitoring/{id}
  updateOutbreak(id: number, request: UpdateOutbreakRequest): Observable<UpdateOutbreakResponse> {
    return this.http.patch<UpdateOutbreakResponse>(
      `${this.baseUrl}/${id}`,
      request,
      { headers: this.getHeaders() }
    );
  }

  // DELETE api/v1/OutbreakMonitoring/{id}
  deleteOutbreak(id: number): Observable<DeleteOutbreakResponse> {
    return this.http.delete<DeleteOutbreakResponse>(
      `${this.baseUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  //Get Outbreak with filters
  private reportingUrl = 'http://localhost:5171/api/v1/ReportingAndAnalytics';

getOutbreakAnalytics(filters: OutbreakAnalyticsRequest): Observable<OutbreakAnalyticsResponse> {
  let params = new HttpParams();
  if (filters.startDate) params = params.set('startDate', filters.startDate);
  if (filters.endDate)   params = params.set('endDate', filters.endDate);
  if (filters.status)    params = params.set('status', filters.status);
  if (filters.region)    params = params.set('region', filters.region);
  return this.http.get<OutbreakAnalyticsResponse>(
    `${this.reportingUrl}/outbreaks`,
    { params }
  );
}
}