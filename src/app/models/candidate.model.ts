import { Job } from './job.models';
import { Skill } from './skill.models';

export interface Candidate {
  id: string;
  experience: Number;
  fName: string;
  lName: string;
  skills: Array<Skill>;
  candidateJobs: Array<Job>;
}
