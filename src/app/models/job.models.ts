import { Skill } from './skill.models';

export interface Job {
  id: number;
  role: string;
  noOfOpenings: Number;
  skills: Array<Skill>;
  jobLocation: string;
  yearsOfExperience: number;
  noOfApplicants: number;
  isActive: boolean;
  company: string;
}
