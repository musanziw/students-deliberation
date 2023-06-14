export interface StudentReportType {
  name: string;
  matricule: string;
  promotion: number;
  field: string;
  courses: any[];
  percentage: number;
  mention: string;
  earnedCredits: number;
  attemptedCredits: number;
  totalHours: number;
  failures: number;
}
