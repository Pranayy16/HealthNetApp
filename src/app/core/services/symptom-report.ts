import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SubmitSymptomReportRequest,
  SubmitSymptomReportResponse,
  SymptomReportResponse,
  PagedResponse
} from '../models/symptom-report';

@Injectable({
  providedIn: 'root'
})
export class SymptomReportService {

  private readonly apiUrl = `${environment.apiUrl}/CitizenSymptomReporting`;

  constructor(private http: HttpClient) { }

  // POST /api/v1/CitizenSymptomReporting
  submitReport(request: SubmitSymptomReportRequest): Observable<SubmitSymptomReportResponse> {
    return this.http.post<SubmitSymptomReportResponse>(this.apiUrl, request);
  }

  // GET /api/v1/CitizenSymptomReporting/mine
  getMyReports(pageNumber = 1, pageSize = 10): Observable<PagedResponse<SymptomReportResponse>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<PagedResponse<SymptomReportResponse>>(`${this.apiUrl}/mine`, { params });
  }
}
