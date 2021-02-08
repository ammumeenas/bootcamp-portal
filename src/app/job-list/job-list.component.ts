import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../Auth/user/user.service';
import { JobFormComponent } from '../job-form/job-form.component';
import { Job } from '../models/job.models';
import { Skill } from '../models/skill.models';
import { Jobservice } from './jobList.services';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  jobs!: Job[];
  isAdmin!: boolean;

  constructor(
    private jobService: Jobservice,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => (this.jobs = jobs));
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id).subscribe(() => {
      const index = this.jobs.findIndex((job) => job.id == id);
      if (index > -1) {
        this.jobs.splice(index, 1);
      }
    });
  }
}
