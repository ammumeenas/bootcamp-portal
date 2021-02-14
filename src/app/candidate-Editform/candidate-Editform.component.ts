import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from '../models/candidate.model';
import { Skill } from '../models/skill.models';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-Editform.component.html',
  styleUrls: ['./candidate-Editform.component.css'],
})
export class CandidateEditFormComponent implements OnInit {
  candidate!: Candidate;
  CandidateForm!: FormGroup;
  error: string = '';
  skills!: Array<Skill>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.CandidateForm = this.formBuilder.group({
      FName: ['', Validators.required],
      LName: ['', Validators.required],
      Experience: [null, Validators.required],
      skills: ['', Validators.required],
    });
  }
  getCandidate(): void {
    this.candidateService.getCandidate().subscribe({
      next: (candidate: Candidate) => this.displayCandidate(candidate),
      error: (err) => (this.error = err),
    });
  }

  saveCandidate(): void {
    if (this.CandidateForm.dirty) {
      if (this.CandidateForm.valid) {
        const candidate = this.CandidateForm.value;
        this.candidateService.updateCandidate(candidate).subscribe({
          next: () => this.saveOnComplete(),
          error: (err) => (this.error = err),
        });
      }
    }
  }

  displayCandidate(candidate: Candidate): void {
    this.candidate = candidate;
    this.CandidateForm.patchValue({
      fName: candidate.fName,
      lName: candidate.lName,
      experience: candidate.experience,
      candidateSkills: candidate.candidateSkills,
    });
  }

  saveOnComplete(): void {
    this.CandidateForm.reset();
  }
}
