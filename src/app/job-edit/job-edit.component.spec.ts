import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';
import { Jobservice } from '../services/job-list.service';

import { JobEditComponent } from './job-edit.component';

describe('JobEditComponent', () => {
  let component: JobEditComponent;
  let fixture: ComponentFixture<JobEditComponent>;
  let jobservice: jasmine.SpyObj<Jobservice>;
  let routerSpy: jasmine.SpyObj<Router>;

  let job: Job;
  let candidate: Candidate;
  let skill: Skill;
  let routes: Router;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    jobservice = jasmine.createSpyObj(Jobservice);
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
    jobservice.getSkills.and.returnValue(of([skill]));
    await TestBed.configureTestingModule({
      declarations: [JobEditComponent],
      providers: [
        {
          provide: Jobservice,
          useValue: jobservice,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } },
          },

          providers: [FormBuilder],
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
