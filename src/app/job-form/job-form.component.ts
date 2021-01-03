import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jobservice } from '../job-list/jobList.services';
import { Job } from '../models/job.models';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private jobservice: Jobservice
  ) {}

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      role: ['', Validators.required],
      noOfOpenings: [null, Validators.required],
      skills: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      noOfApplicants: ['', Validators.required],
      applicationStatus: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  saveJob(): void {
    if (this.jobForm.dirty) {
      if (this.jobForm.valid) {
        const job = this.jobForm.value;
        this.jobservice.createJob(job).subscribe({
          next: () => this.saveOnComplete(),
        });
      }
    }
  }
  saveOnComplete() {
    this.jobForm.reset();
  }
}
