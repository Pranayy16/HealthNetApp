// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { environment } from '../../../../environments/environment';
// import { ComplianceRecordList, Filters } from '../../models/compliance';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ComplianceService {
//   private http: HttpClient = inject(HttpClient);
//   private readonly apiBaseUrl = environment.apiUrl+"/ComplianceRecord";
//                           //passing data to backend     //getting the data from the backend
//   searchComplianceRecords(filters: Filters) : Observable<ComplianceRecordList[]>{
//       return this.http.get(this.apiBaseUrl, { params: {
//         date: filters.date.toISOString(),
//         result: filters.result,
//         type: filters.type
//       }}) as Observable<ComplianceRecordList[]>;

//       //using this get method we are passing the parameters and getting the data
//   }
// }

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import { ComplianceRecordList, ComplianceRecordResponse, CreateComplianceRecord, Filters } from '../../models/compliance';
import { CreateComplianceRecord, ComplianceRecordResponse } from '../../models/compliance';
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

  // // GET — search compliance records with filters
  // searchComplianceRecords(filters: Filters): Observable<ComplianceRecordList[]> {
  //   return this.http.get(this.apiBaseUrl, {
  //     params: {
  //       date: filters.date.toISOString(),
  //       result: filters.result,
  //       type: filters.type,
  //     },
  //   }) as Observable<ComplianceRecordList[]>;
  // }
  
}