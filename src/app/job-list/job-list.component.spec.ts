import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';
import { from, Observable, of } from 'rxjs';
import { UserService } from '../Auth/user/user.service';
import { JobFormComponent } from '../job-form/job-form.component';
import { Candidate } from '../models/candidate.model';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';
import { CandidateService } from '../services/candidate.service';
import { Jobservice } from '../services/job-list.service';

import { JobListComponent } from './job-list.component';
describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let joblistservice: jasmine.SpyObj<Jobservice>;
  let candidateService: jasmine.SpyObj<CandidateService>;
  let userService: any;
  let job: Job[];
  let candidate: Candidate;
  let skill: Skill;

  beforeEach(async () => {
    joblistservice = jasmine.createSpyObj('Jobservice', ['getJobs']);
    candidateService = jasmine.createSpyObj('CandidateService', [
      'getCandidate',
    ]);
    userService = {
      isAdmin: true,
      _isAdmin: true,
    };
    skill = {
      id: 1,
      name: 'java',
      description: 'backend',
      checked: true,
    };

    job = [
      {
        id: 1,
        role: 'developer',
        noOfOpenings: 5,
        skills: [skill],
        jobLocation: 'stl',
        yearsOfExperience: 8,
        noOfApplicants: 20,
        isActive: 'true',
        company: 'WWT',
      },
      {
        id: 2,
        role: 'Testing',
        noOfOpenings: 5,
        skills: [skill],
        jobLocation: 'stl',
        yearsOfExperience: 8,
        noOfApplicants: 10,
        isActive: 'true',
        company: 'Mastercard',
      },
    ];

    candidate = {
      id: 'abc@example',
      experience: 10,
      fName: 'john',
      lName: 'victor',
      skills: [skill],
      jobs: job,
    };

    joblistservice.getJobs.and.returnValue(of(job));
    candidateService.getCandidate.and.returnValue(of(candidate));

    await TestBed.configureTestingModule({
      declarations: [JobListComponent],
      providers: [
        {
          provide: Jobservice,
          useValue: joblistservice,
        },
        {
          provide: CandidateService,
          useValue: candidateService,
        },
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fdescribe('#ngOnInit', () => {
    it('should call JobList service and return list of jobs when ngOnInit is fired', () => {
      component.ngOnInit();

      expect(joblistservice.getJobs).toHaveBeenCalled();
      expect(component.jobs).toEqual(job);
    });

    it('should call candidate service and return list of candidates when ngOnInit is fired', () => {
      component.ngOnInit();

      expect(candidateService.getCandidate).toHaveBeenCalled();
      expect(component.candidate).toEqual(candidate);
    });

    it('should delete the job if the delete button is clicked', () => {
      const deleteButton = fixture.debugElement.query(By.css('.delete-button'));
      deleteButton.nativeElement.click();

      fixture.detectChanges();

      expect(component.jobs.length).toEqual(1);
    });
  });
});
