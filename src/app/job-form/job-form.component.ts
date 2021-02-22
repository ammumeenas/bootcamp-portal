import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Jobservice } from '../services/job-list.service';
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
    private jobservice: Jobservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group({
      role: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      location: ['', Validators.required],
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
    this.router.navigate(['job']);
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
