import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Candidate } from '../models/candidate.model';
import { CandidateJob } from '../models/candidateJob.models';
import { Job } from '../models/job.models';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  candidateUrl: string = 'https://localhost:5001/api/candidate';

  candidateJobUrl: string = 'https://localhost:5001/api/CandidateJob';

  getCandidate(): Observable<Candidate> {
    return this.authService.user$.pipe(
      take(1),
      mergeMap((user) => {
        const url = `${this.candidateUrl}/${user.email}`;
        return this.http.get<Candidate>(url);
      })
    );
  }

  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.candidateUrl, candidate, {
      headers: this.headers,
    });
  }

  createCandidateJob(candidateJob: CandidateJob): Observable<CandidateJob> {
    return this.http.post<CandidateJob>(this.candidateJobUrl, candidateJob, {
      headers: this.headers,
    });
  }

  getJobsForCandidate(id: string): Observable<Array<Job>> {
    return this.http.get<Array<Job>>(`${this.candidateJobUrl}/${id}`);
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    const editUrl = `${this.candidateUrl}/${candidate.id}`;
    return this.http.put<Candidate>(editUrl, candidate, {
      headers: this.headers,
    });
  }
  deleteCandidate(id: number) {
    const deleteUrl = `${this.candidateUrl}/${id}`;
    return this.http.delete(deleteUrl, { headers: this.headers });
  }
}
