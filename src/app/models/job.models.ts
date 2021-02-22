import { Candidate } from './candidate.model';
import { CandidateJob } from './candidateJob.models';
import { Skill } from './skill.models';

export interface Job {
  id: number;
  role: string;
  noOfOpenings: Number;
  skills: Array<Skill>;
  jobLocation: string;
  yearsOfExperience: number;
  noOfApplicants: number;
  isActive: string;
  company: string;
  candidates?: Array<Candidate>;
}
