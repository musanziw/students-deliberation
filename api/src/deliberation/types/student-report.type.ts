export interface StudentReportType {
  name: string;
  matricule: string;
  field: string;
  email: string;
  courses: any[];
  percentage: number;
  mention: string;
  earnedCredits: number;
  attemptedCredits: number;
  totalHours: number;
  failures: number;
}
