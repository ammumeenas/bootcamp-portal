import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Jobservice } from '../job-list/jobList.services';
import { Job } from '../models/job.models';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job!: Job;
  errormessage: string = '';
  constructor(private jobservice: Jobservice, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap.get('id');
    if (params) {
      const id = +params;
      this.getJob(id);
      console.log(id);
    }
  }
  getJob(id: number): void {
    this.jobservice.getJob(id).subscribe((job) => {
      (this.job = job), (this.job.noOfApplicants = job.Candidates.length);
    });
  }
}
