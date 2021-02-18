import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { UserService } from '../Auth/user/user.service';
import { Candidate } from '../models/candidate.model';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  candidateProfile!: Candidate;
  constructor(
    public userService: UserService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.candidateService.getCandidate().subscribe((candidate) => {
      this.candidateProfile = candidate;
      console.log('candidate is:', candidate);
    });
  }
}
