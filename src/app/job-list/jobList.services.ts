import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job.models';
import { Observable } from 'rxjs';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class Jobservice {
  constructor(private http: HttpClient) {}

  jobUrl: string = 'https://5f441fac3fb92f0016753411.mockapi.io/api/jobs';

  getJobs() {
    return this.http.get<Job[]>(this.jobUrl);
  }

  getJob(id: number): Observable<Job> {
    const url = `${this.jobUrl}/${id}`;
    return this.http.get<Job>(url);
  }

  updateJob(job: Job): Observable<Job> {
    const headers = new HttpHeaders({ 'Content-Type': 'applications/json' });
    const editUrl = `${this.jobUrl}/${job.id}`;
    return this.http.put<Job>(editUrl, job, { headers: headers });
  }

  createJob(job: Job): Observable<Job> {
    const headers = new HttpHeaders({ 'Content-Type': 'applications/json' });
    return this.http.post<Job>(this.jobUrl, job, { headers: headers });
  }

  deleteJob(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'applications/json' });
    const deleteUrl = `${this.jobUrl}/${id}`;
    return this.http.delete(deleteUrl, { headers: headers });
  }
}
