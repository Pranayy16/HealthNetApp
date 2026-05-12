
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateComplianceRecord, ComplianceRecordResponse, Filters, ComplianceRecordList } from '../../models/compliance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComplianceService {
  private http: HttpClient = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiUrl + '/ComplianceRecord';

  // POST — create a new compliance record
  // Date is not sent — backend sets it automatically to DateTime.UtcNow
  createComplianceRecord(data: CreateComplianceRecord): Observable<ComplianceRecordResponse> {
    return this.http.post<ComplianceRecordResponse>(this.apiBaseUrl, data);
  }

  // GET — search compliance records
  // Only sends filters that are actually filled in
  searchComplianceRecords(filters: Filters): Observable<ComplianceRecordList[]> {
    let params: any = {};
    if (filters.type)   params['type']   = filters.type;
    if (filters.result) params['result'] = filters.result;
    if (filters.date)   params['date']   = filters.date;
    return this.http.get<ComplianceRecordList[]>(this.apiBaseUrl, { params });
  }

}