import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jobservice } from '../job-list/jobList.services';
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
  selectedCandidate!: Array<Skill>;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private jobService: Jobservice
  ) {}

  ngOnInit(): void {
    this.jobService.getSkills().subscribe((skills) => (this.skills = skills));
    this.CandidateForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
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
    this.selectedCandidate = this.candidate.skills;
    this.CandidateForm.patchValue({
      fName: candidate.fName,
      lName: candidate.lName,
      experience: candidate.experience,
      skills: this.skills,
    });
  }

  saveOnComplete(): void {
    this.CandidateForm.reset();
  }
}
