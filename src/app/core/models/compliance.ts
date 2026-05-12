// export class Filters{
//     date: Date;
//     result: string;
//     type: string;

//     constructor(data: Date, result: string, type: string) {
//         this.date = data;
//         this.result = result;
//         this.type = type;
//     }
// }

// export class ComplianceRecordList {
//     complianceId: number;
//     entityId: number;
//     type: string;
//     result: string;
//     date: Date;
//     notes: string;

//     constructor(complianceId: number, entityId: number, type: string, result: string, date: Date, notes: string) {
//         this.complianceId = complianceId;
//         this.entityId = entityId;
//         this.type = type;
//         this.result = result;
//         this.date = date;
//         this.notes = notes;
//     }

// }

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
