import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateLabTestRequest, CreateLabTestResponse, LabReportResponse, LabTestFilter, LabTestResponse } from '../models/lab-test.model';

@Injectable({
  providedIn: 'root'
})
export class LabTestService {

  private readonly apiUrl = `${environment.apiUrl}LaboratoryTesting/lab-tests`;
  private readonly labReportUrl = `${environment.apiUrl}LabReport`;

  constructor(private http: HttpClient) {}

  getLabTests(filter?: LabTestFilter): Observable<LabTestResponse> {
    let params = new HttpParams();

    if (filter?.type)   params = params.set('type', filter.type);
    if (filter?.status) params = params.set('status', filter.status);
    if (filter?.date)   params = params.set('date', filter.date);

    return this.http.get<LabTestResponse>(this.apiUrl, { params });
  }

  getReportsByTestId(testId: number): Observable<LabReportResponse> {
    return this.http.get<LabReportResponse>(`${this.labReportUrl}/test/${testId}`);
  }

  downloadReport(testId: number): Observable<Blob> {
    return this.http.get(`${this.labReportUrl}/test/${testId}/download`, {
      responseType: 'blob'
    });
  }

  createLabTest(request: CreateLabTestRequest): Observable<CreateLabTestResponse> {
    return this.http.post<CreateLabTestResponse>(this.apiUrl, request);
  }
}