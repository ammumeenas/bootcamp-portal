import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job.models';
import { Observable } from 'rxjs';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Skill } from '../models/skill.models';

@Injectable({
  providedIn: 'root',
})
export class Jobservice {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  jobUrl: string = 'https://localhost:5001/api/Job';
  skillUrl: string = 'https://localhost:5001/api/Skill';

  getJobs() {
    return this.http.get<Job[]>(this.jobUrl);
  }

  getSkill(id: number): Observable<Skill> {
    const url = `${this.skillUrl}/${id}`;
    return this.http.get<Skill>(url);
  }

  getJob(id: number): Observable<Job> {
    const url = `${this.jobUrl}/${id}`;
    return this.http.get<Job>(url);
  }

  getSkills() {
    console.log('its in skill service');
    return this.http.get<Skill[]>(this.skillUrl);
  }

  updateJob(job: Job): Observable<Job> {
    const editUrl = `${this.jobUrl}/${job.id}`;
    return this.http.put<Job>(editUrl, job, { headers: this.headers });
  }

  updateSkill(skill: Skill): Observable<Skill> {
    const editUrl = `${this.skillUrl}/${skill.id}`;
    return this.http.put<Skill>(editUrl, skill, { headers: this.headers });
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.jobUrl, job, { headers: this.headers });
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.skillUrl, skill, {
      headers: this.headers,
    });
  }

  deleteJob(id: number) {
    const deleteUrl = `${this.jobUrl}/${id}`;
    return this.http.delete(deleteUrl, { headers: this.headers });
  }

  deleteSkill(id: number) {
    const deleteUrl = `${this.skillUrl}/${id}`;
    return this.http.delete(deleteUrl, { headers: this.headers });
  }
}
