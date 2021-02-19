import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  selectedSkills: Array<Number> = [];
  constructor(
    private formBuilder: FormBuilder,
    private jobservice: Jobservice
  ) {}

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      role: ['', Validators.required],
      noOfOpenings: [null, Validators.required],
      yearsOfExperience: ['', Validators.required],
      applicationStatus: ['', Validators.required],
      company: ['', Validators.required],
    });
    this.jobservice.getSkills().subscribe((skills) => (this.skills = skills));
  }

  saveJob(): void {
    if (this.jobForm.dirty) {
      if (this.jobForm.valid) {
        const job = {
          ...this.jobForm.value,
          skills: this.selectedSkills,
        };
        console.log('job is:', job);
        this.jobservice.createJob(job).subscribe({
          next: () => this.saveOnComplete(),
        });
      }
    }
  }
  saveOnComplete() {
    this.jobForm.reset();
  }

  onCheckboxSelected(event: any) {
    /* Selected */
    if (event.target.checked) {
      this.selectedSkills.push(event.target.value);
    } else {
      /* unselected */
      const index = this.selectedSkills.indexOf(event.target.value, 0);
      if (index > -1) {
        this.selectedSkills.splice(index, 1);
      }
    }
  }
}
