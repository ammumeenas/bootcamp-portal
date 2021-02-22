import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jobservice } from '../services/job-list.service';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css'],
})
export class JobEditComponent implements OnInit {
  job!: Job;
  skills: Array<Skill> = [];
  error: string = '';
  jobForm!: FormGroup;
  selectedSkills: Array<Number> = [];
  constructor(
    private route: ActivatedRoute,
    private jobservice: Jobservice,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobservice.getSkills().subscribe((skills) => (this.skills = skills));
    this.jobForm = this.fb.group({
      role: ['', Validators.required],
      noOfOpenings: [null, Validators.required],
      skills: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
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
    this.jobservice.getJob(id).subscribe(
      (job: Job) => {
        this.displayJob(job);
        job.skills.forEach((element) => {
          this.selectedSkills.push(element.id);
          console.log('selectes skills are:', this.selectedSkills);
        });
      },
      (err) => (this.error = err)
    );
  }

  saveJob(): void {
    if (this.jobForm.valid) {
      const p = {
        ...this.jobForm.value,
        id: this.job.id,
        skills: this.selectedSkills,
      };
      this.jobservice.updateJob(p).subscribe({
        next: () => this.saveOnComplete(),
        error: (err) => (this.error = err),
      });
    }
    this.router.navigate(['job']);
  }

  displayJob(job: Job): void {
    this.job = job;
    this.jobForm.patchValue({
      role: job.role,
      noOfOpenings: job.noOfOpenings,
      skills: this.skills,
      yearsOfExperience: job.yearsOfExperience,
      noOfApplicants: job.noOfApplicants,
      applicationStatus: job.isActive,
      company: job.company,
    });
  }

  saveOnComplete(): void {
    this.jobForm.reset();
  }

  doesJobHaveSkill(skill: Skill) {
    return this.job.skills.some((s) => s.id === skill.id);
  }

  onCheckboxSelected(event: any) {
    /* Selected */
    if (event.target.checked) {
      this.selectedSkills.push(+event.target.value);
    } else {
      /* unselected */
      const index = this.selectedSkills.indexOf(+event.target.value, 0);
      if (index > -1) {
        this.selectedSkills.splice(index, 1);
      }
    }
  }
}
