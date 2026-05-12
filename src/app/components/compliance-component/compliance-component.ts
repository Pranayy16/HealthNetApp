import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplianceService } from '../../core/services/compliance/compliance-service';
import { ComplianceRecordList, Filters } from '../../core/models/compliance';

@Component({
  selector: 'app-compliance-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './compliance-component.html',
  styleUrl: './compliance-component.css',
})
export class ComplianceComponent {

  // Filter fields — bound to form inputs
  selectedType: string = '';
  selectedResult: string = '';
  selectedDate: string = '';

  // Data from backend
  records: ComplianceRecordList[] = [];

  // UI state
  isLoading: boolean = false;
  hasSearched: boolean = false;
  errorMessage: string = '';

  // Type dropdown options — matches backend allowed values
  typeOptions = [
    { label: 'Case',     value: 'case' },
    { label: 'Lab Test', value: 'test' },
    { label: 'Outbreak', value: 'outbreak' },
  ];

  // Result dropdown options — matches backend allowed values
  resultOptions = [
    { label: 'Compliant',           value: 'compliant' },
    { label: 'Non Compliant',       value: 'non compliant' },
    { label: 'Partially Compliant', value: 'partially compliant' },
    { label: 'Pending Review',      value: 'pending review' },
  ];

  constructor(private complianceService: ComplianceService) {}

  onSearch(): void {
    this.errorMessage = '';
    this.isLoading = true;
    this.hasSearched = true;

    const filters = new Filters(
      this.selectedDate,
      this.selectedResult,
      this.selectedType
    );

    this.complianceService.searchComplianceRecords(filters).subscribe({
      next: (response: ComplianceRecordList[]) => {
        this.records = response;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.records = [];
        if (err.status === 404) {
          this.errorMessage = err.error || 'No compliance records found.';
        } else if (err.status === 400) {
          this.errorMessage = err.error || 'Invalid filter values provided.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    });
  }

  onClearFilters(): void {
    this.selectedType = '';
    this.selectedResult = '';
    this.selectedDate = '';
    this.records = [];
    this.errorMessage = '';
    this.hasSearched = false;
  }

  getTypeBadgeClass(type: string): string {
    const map: Record<string, string> = {
      case:     'type-case',
      test:     'type-test',
      outbreak: 'type-outbreak',
    };
    return map[type?.toLowerCase()] ?? 'type-case';
  }

  getTypeIcon(type: string): string {
    const map: Record<string, string> = {
      case:     'ti-stethoscope',
      test:     'ti-flask',
      outbreak: 'ti-virus',
    };
    return map[type?.toLowerCase()] ?? 'ti-file-report';
  }

  getResultBadgeClass(result: string): string {
    const map: Record<string, string> = {
      'compliant':           'result-compliant',
      'non compliant':       'result-non-compliant',
      'partially compliant': 'result-partially-compliant',
      'pending review':      'result-pending-review',
    };
    return map[result?.toLowerCase()] ?? 'result-pending-review';
  }
}