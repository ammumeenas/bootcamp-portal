import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';
import { CandidateService } from '../services/candidate.service';

import { CandidateProfileComponent } from './candidate-profile.component';

describe('CandidateProfileComponent', () => {
  let component: CandidateProfileComponent;
  let fixture: ComponentFixture<CandidateProfileComponent>;
  let candidateService: jasmine.SpyObj<CandidateService>;
  let job: Job;
  let candidate: Candidate;
  let skill: Skill;

  beforeEach(async () => {
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
      declarations: [CandidateProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
