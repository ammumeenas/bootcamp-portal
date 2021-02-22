import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jobservice } from '../services/job-list.service';
import { Job } from '../models/job.models';

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.css'],
})
export class CandidateViewComponent implements OnInit {
  @Input() job!: Job;
  constructor(private route: ActivatedRoute, private jobService: Jobservice) {}

  ngOnInit(): void {
    console.log('job in view candidate is:', this.job);
    const params = this.route.snapshot.paramMap.get('id');

    if (params) {
      const id = +params;
      this.jobService.getJob(id).subscribe((job) => {
        (this.job = job), console.log('job is:', job);
      });
    }
  }
}
