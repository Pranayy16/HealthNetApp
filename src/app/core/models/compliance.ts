
export class CreateComplianceRecord {
    entityId: number;
    type: string;
    result: string;
    notes: string;

    constructor(entityId: number, type: string, result: string, notes: string) {
        this.entityId = entityId;
        this.type = type;
        this.result = result;
        this.notes = notes;
    }
}

export class ComplianceRecordResponse {
    complianceId: number;

    constructor(complianceId: number) {
        this.complianceId = complianceId;
    }
}


// Filters for searching compliance records
export class Filters {
    date: string;
    result: string;
    type: string;

    constructor(date: string, result: string, type: string) {
        this.date = date;
        this.result = result;
        this.type = type;
    }
}

// Shape of each compliance record returned from backend
export class ComplianceRecordList {
    complianceId: number;
    entityId: number;
    type: string;
    result: string;
    date: Date;
    notes: string;
    isDeleted: boolean;

    constructor(
        complianceId: number,
        entityId: number,
        type: string,
        result: string,
        date: Date,
        notes: string,
        isDeleted: boolean
    ) {
        this.complianceId = complianceId;
        this.entityId = entityId;
        this.type = type;
        this.result = result;
        this.date = date;
        this.notes = notes;
        this.isDeleted = isDeleted;
    }
}
