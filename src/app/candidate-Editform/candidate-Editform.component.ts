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
  skills: Array<Skill> = [];
  selectedCandidate!: Array<Skill>;
  selectedSkills: Array<Number> = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private jobService: Jobservice
  ) {}

  ngOnInit(): void {
    this.jobService.getSkills().subscribe((skills) => (this.skills = skills));
    this.getCandidate();
    this.CandidateForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      Experience: [null, Validators.required],
      skills: ['', Validators.required],
    });
  }
  getCandidate(): void {
    this.candidateService.getCandidate().subscribe(
      (candidate: Candidate) => {
        this.displayCandidate(candidate);
        candidate.skills.forEach((element) => {
          this.selectedSkills.push(element.id);
        });
      },

      (err) => (this.error = err)
    );
  }

  saveCandidate(): void {
    if (this.CandidateForm.dirty) {
      if (this.CandidateForm.valid) {
        const candidate = {
          ...this.CandidateForm.value,
          skills: this.selectedSkills,
          id: this.candidate.id,
        };
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
      skills: this.skills,
    });
  }

  saveOnComplete(): void {
    this.CandidateForm.reset();
  }

  doesCandidateHaveSkill(skill: Skill) {
    return this.candidate.skills.some((s) => s.id === skill.id);
  }

  onCheckboxSelected(event: any) {
    if (event.target.value.checked) {
      this.selectedSkills.push(+event.target.value);
    } else {
      const index = this.selectedSkills.indexOf(+event.target.value);
      if (index > -1) {
        this.selectedSkills.splice(index, 1);
      }
    }
  }
}
