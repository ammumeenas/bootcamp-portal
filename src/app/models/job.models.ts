export interface Job {
  id: number;
  role: string;
  noOfOpenings: Number;
  skills: Array<string>;
  jobLocation: string;
  yearsOfExperience: number;
  noOfApplicants: number;
  isActive: boolean;
  Company: string;
}
