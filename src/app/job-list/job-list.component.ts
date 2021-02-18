import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../Auth/user/user.service';
import { JobFormComponent } from '../job-form/job-form.component';
import { Candidate } from '../models/candidate.model';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';
import { CandidateService } from '../services/candidate.service';
import { Jobservice } from './jobList.services';
import { CandidateJob } from '../models/candidateJob.models';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  isAdmin: boolean = false;
  candidate!: Candidate;
  candidateJob!: CandidateJob;
  selectedJobsForCandidates: Array<Job> = [];
  constructor(
    private jobService: Jobservice,
    public userService: UserService,
    public candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => (this.jobs = jobs));
    this.candidateService.getCandidate().subscribe((candidate) => {
      this.candidate = candidate;
    candidate.candidateJobs.forEach((job) => {
this.selectedJobsForCandidates.push(job)
      }))
      
    });
    // this.candidate.candidateJobs.forEach((job) => {
    //   if (this.jobs.includes(job)) {
    //     this.IsJobApplied = 'Applied';
    //   } else {
    //     this.IsJobApplied = 'Apply';
    //   }
    // });
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id).subscribe(() => {
      const index = this.jobs.findIndex((job) => job.id == id);
      if (index > -1) {
        this.jobs.splice(index, 1);
      }
    });
  }

  applyForThisJob(jobId: number) {
    if (this.IsJobApplied === 'Apply') {
      this.candidateJob.CandidateId = this.candidate.id;
      this.candidateJob.JobId = jobId;

      this.candidateService.createCandidateJob(this.candidateJob);
    }
  }
}
