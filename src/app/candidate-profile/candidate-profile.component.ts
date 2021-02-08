import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../Auth/user/user.service';
import { Candidate } from '../models/candidate.model';
import { Skill } from '../models/skill.models';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css'],
})
export class CandidateProfileComponent {
  candidate!: Candidate;
  isAdmin!: boolean;
  email!: string;
  constructor(
    private candidateService: CandidateService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.isAdmin().subscribe((isAdmin) => (this.isAdmin = isAdmin));
    this.candidateService.getCandidate().subscribe((candidate) => {
      this.candidate = candidate;
    });
  }
}
