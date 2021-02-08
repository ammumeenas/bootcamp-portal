import { Job } from './job.models';
import { Skill } from './skill.models';

export interface Candidate {
  id: string;
  Experience: Number;
  FName: string;
  LName: string;
  Skills: Array<Skill>;
  Jobs: Array<Job>;
}
