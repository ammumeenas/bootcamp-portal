import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jobservice } from '../job-list/jobList.services';
import { Skill } from '../models/skill.models';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-candidate-create-profile',
  templateUrl: './candidate-create-profile.component.html',
  styleUrls: ['./candidate-create-profile.component.css'],
})
export class CandidateCreateProfileComponent implements OnInit {
  candidateForm!: FormGroup;
  skills!: Array<Skill>;
  selectedSkills: Array<Number> = [];
  userId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private jobservice: Jobservice,
    private auth: AuthService,
    private candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.userId = user.email;
    });

    this.candidateForm = this.formBuilder.group({
      Id: [this.userId],
      FName: ['', Validators.required],
      LName: [null, Validators.required],
      Experience: [null, Validators.required],
    });
    this.jobservice.getSkills().subscribe((skills) => (this.skills = skills));
  }
  saveProfile(): void {
    if (this.candidateForm.dirty) {
      if (this.candidateForm.valid) {
        const candidate = {
          ...this.candidateForm.value,
          skills: this.selectedSkills,
          Id: this.userId,
        };
        console.log('candidate is:', candidate);
        this.candidateService.createCandidate(candidate).subscribe({
          next: () => this.saveOnComplete(),
        });
      }
    }
  }
  saveOnComplete() {
    this.candidateForm.reset();
    this.router.navigate(['job']);
  }

  onCheckboxSelected(event: any) {
    /* Selected */
    if (event.target.checked) {
      this.selectedSkills.push(event.target.value);
    } else {
      /* unselected */
      const index = this.selectedSkills.indexOf(event.target.value);
      if (index > -1) {
        this.selectedSkills.splice(index, 1);
      }
    }
  }
}
