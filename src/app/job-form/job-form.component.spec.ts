import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';
import { Jobservice } from '../services/job-list.service';

import { JobFormComponent } from './job-form.component';

describe('JobFormComponent', () => {
  let component: JobFormComponent;
  let fixture: ComponentFixture<JobFormComponent>;
  let jobservice: jasmine.SpyObj<Jobservice>;

  let job: Job;
  let candidate: Candidate;
  let skill: Skill;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    skill = {
      id: 1,
      name: 'java',
      description: 'backend',
      checked: true,
    };

    job = {
      id: 1,
      role: 'developer',
      noOfOpenings: 5,
      skills: [skill],
      jobLocation: 'stl',
      yearsOfExperience: 8,
      noOfApplicants: 20,
      isActive: 'true',
      company: 'WWT',
    };

    candidate = {
      id: 'abc@example',
      experience: 10,
      fName: 'john',
      lName: 'victor',
      skills: [skill],
      jobs: [job],
    };
    jobservice.getJob.and.returnValue(of(job));

    await TestBed.configureTestingModule({
      declarations: [JobFormComponent],
      providers: [
        {
          provide: Jobservice,
          useValue: jobservice,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: [{ id: 1 }],
          },

          providers: [FormBuilder],
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
