import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplianceService } from '../../core/services/compliance/compliance-service';
import { CreateComplianceRecord, ComplianceRecordResponse } from '../../core/models/compliance';

@Component({
  selector: 'app-create-compliance-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-compliance-component.html',
  styleUrl: './create-compliance-component.css',
})
export class CreateComplianceComponent {

  // Form fields — bound to the HTML inputs
  entityId: number | null = null;
  type: string = '';
  result: string = '';
  notes: string = '';

  // UI state
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  createdComplianceId: number | null = null;

  // Dropdown options — matches backend allowed values exactly
  typeOptions = [
    { label: 'Case',     value: 'case' },
    { label: 'Lab Test', value: 'test' },
    { label: 'Outbreak', value: 'outbreak' },
  ];

  resultOptions = [
    { label: 'Compliant',            value: 'compliant' },
    { label: 'Non Compliant',        value: 'non compliant' },
    { label: 'Partially Compliant',  value: 'partially compliant' },
    { label: 'Pending Review',       value: 'pending review' },
  ];

  constructor(private complianceService: ComplianceService) {}

  onSubmit(): void {
    // Reset messages
    this.successMessage = '';
    this.errorMessage = '';
    this.createdComplianceId = null;

    // Basic validation
    if (!this.entityId || this.entityId <= 0) {
      this.errorMessage = 'Please enter a valid Entity ID.';
      return;
    }
    if (!this.type) {
      this.errorMessage = 'Please select a type.';
      return;
    }
    if (!this.result) {
      this.errorMessage = 'Please select a result.';
      return;
    }
    if (!this.notes.trim()) {
      this.errorMessage = 'Please enter notes.';
      return;
    }

    this.isLoading = true;

    // Build the request object — date not included, backend sets it
    const payload = new CreateComplianceRecord(
      this.entityId,
      this.type,
      this.result,
      this.notes
    );

    this.complianceService.createComplianceRecord(payload).subscribe({
      next: (response: ComplianceRecordResponse) => {
        this.isLoading = false;
        this.createdComplianceId = response.complianceId;
        this.successMessage = `Compliance record created successfully!`;
        this.onReset(); // clear form after success
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error || 'Something went wrong. Please try again.';
      }
    });
  }

  onReset(): void {
    this.entityId = null;
    this.type = '';
    this.result = '';
    this.notes = '';
    this.errorMessage = '';
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