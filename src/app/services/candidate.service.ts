import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, take } from 'rxjs/operators';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  candidateUrl: string = 'https://localhost:5001/api/candidate';

  getCandidate(): Observable<Candidate> {
    return this.authService.user$.pipe(
      take(1),
      mergeMap((user) => {
        const url = `${this.candidateUrl}/${user.email}`;
        return this.http.get<Candidate>(url);
      })
    );
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
