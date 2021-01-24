import { ComponentFixture, TestBed } from '@angular/core/testing';
import { from, Observable } from 'rxjs';
import { Job } from '../models/job.models';
import { createSpyObject } from '../Testing/jasmine.functions';

import { JobListComponent } from './job-list.component';
import { Jobservice } from './jobList.services';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;
  let joblistservice: jasmine.SpyObj<Jobservice>;

  beforeEach(async () => {
    joblistservice = createSpyObject(Jobservice);

    joblistservice.getJobs.and.returnValue(new Observable<Job[]>());

    await TestBed.configureTestingModule({
      declarations: [JobListComponent],
      providers: [
        {
          provide: Jobservice,
          useValue: joblistservice,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    it('should call JobList service when ngOnInit is fired', () => {
      component.ngOnInit();
      expect(joblistservice.getJobs).toHaveBeenCalled();
    });
  });
});
