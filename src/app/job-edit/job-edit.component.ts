import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jobservice } from '../job-list/jobList.services';
import { Job } from '../models/job.models';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css'],
})
export class JobEditComponent implements OnInit {
  job!: Job;
  error: string = '';
  jobForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private jobservice: Jobservice,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      role: ['', Validators.required],
      noOfOpenings: [null, Validators.required],
      skills: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      noOfApplicants: ['', Validators.required],
      applicationStatus: ['', Validators.required],
      company: ['', Validators.required],
    });

    const params = this.route.snapshot.paramMap.get('id');
    if (params) {
      const id = +params;
      this.getjob(id);
    }
  }

  getjob(id: number): void {
    this.jobservice.getJob(id).subscribe({
      next: (job: Job) => this.displayJob(job),
      error: (err) => (this.error = err),
    });
  }

  saveJob(): void {
    if (this.jobForm.dirty) {
      if (this.jobForm.valid) {
        const p = { ...this.job, ...this.jobForm.value };
        this.jobservice.updateJob(p).subscribe({
          next: () => this.saveOnComplete(),
          error: (err) => (this.error = err),
        });
      }
    }
  }

  displayJob(job: Job): void {
    this.job = job;
    this.jobForm.patchValue({
      role: job.role,
      noOfOpenings: job.noOfOpenings,
      skills: job.skills,
      yearsOfExperience: job.yearsOfExperience,
      noOfApplicants: job.noOfApplicants,
      applicationStatus: job.isActive,
      company: job.Company,
    });
  }

  saveOnComplete(): void {
    this.jobForm.reset();
  }
}
