// import { Component } from '@angular/core';
// import { ComplianceRecordList, Filters } from '../../core/models/compliance';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ComplianceService } from '../../core/services/compliance/compliance-service';

// @Component({
//   selector: 'app-compliance-component',
//   imports: [FormsModule, CommonModule],
//   templateUrl: './compliance-component.html',
//   styleUrl: './compliance-component.css',
// })
// export class ComplianceComponent {
//   filters: Filters;
//   records: ComplianceRecordList[];
//   errorMessage: string;

//   constructor(private complianceService: ComplianceService) {
//     this.filters = new Filters(new Date(), "", "");
//     this.records = [];
//     this.errorMessage = "";
//   }

//   onSearch(){
//     this.complianceService.searchComplianceRecords(this.filters).subscribe({
//       next: (response) =>{
//         console.log("Search filter in compliance.")
//         this.records = response;
//         console.log("Response: ",response);
//       },
//       error: (err: any) =>{
//         this.errorMessage = err.error;
//       }
//     });
//   }

//   onClearFilters(){

//   }
// }
