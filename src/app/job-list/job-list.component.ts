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
  selectedJobsIdForCandidates: Array<number> = [];

  constructor(
    private jobService: Jobservice,
    public userService: UserService,
    public candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
      console.log('candidates', jobs.length);
    });

    this.candidateService.getCandidate().subscribe((candidate) => {
      (this.candidate = candidate),
        candidate.jobs.forEach((job) => {
          this.selectedJobsIdForCandidates.push(job.id);
        });
    });
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id).subscribe(() => {
      const index = this.jobs.findIndex((job) => job.id == id);
      if (index > -1) {
        this.jobs.splice(index, 1);
      }
    });
  }

  applyJob(jobId: number) {
    const isOk = confirm(`Do you want to apply for job id:${jobId}`);

    if (!isOk) {
      return;
    }
    const candidateJob: CandidateJob = {
      jobId: jobId,
      candidateId: this.candidate.id,
    };
    this.candidateService.createCandidateJob(candidateJob).subscribe((cj) => {
      this.selectedJobsIdForCandidates.push(cj.jobId);
    });
  }
}
