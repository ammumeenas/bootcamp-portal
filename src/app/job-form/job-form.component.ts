import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Jobservice } from '../job-list/jobList.services';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  skills!: Array<Skill>;
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
    this.jobservice.getSkills().subscribe((skills) => (this.skills = skills));
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
