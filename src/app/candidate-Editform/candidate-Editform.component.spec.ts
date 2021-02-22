import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';
import { CandidateService } from '../services/candidate.service';
import { Jobservice } from '../services/job-list.service';
import { CandidateEditFormComponent } from './candidate-Editform.component';

describe('CandidateFormComponent', () => {
  let component: CandidateEditFormComponent;
  let fixture: ComponentFixture<CandidateEditFormComponent>;
  let candidateService: jasmine.SpyObj<CandidateService>;
  let jobservice: jasmine.SpyObj<Jobservice>;

  let job: Job;
  let candidate: Candidate;
  let skill: Skill;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    jobservice = jasmine.createSpyObj(Jobservice);

    candidateService = jasmine.createSpyObj(CandidateService);
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
    candidateService.getCandidate.and.returnValue(of(candidate));

    await TestBed.configureTestingModule({
      declarations: [CandidateEditFormComponent],
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
    fixture = TestBed.createComponent(CandidateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
