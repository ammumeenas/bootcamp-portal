import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jobservice } from '../job-list/jobList.services';
import { Skill } from '../models/skill.models';
import { SkillFormComponent } from '../skill-form/skill-form.component';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css'],
})
export class SkillEditComponent implements OnInit {
  skill!: Skill;
  error: string = '';
  skillForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private jobservice: Jobservice,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    const params = this.route.snapshot.paramMap.get('id');
    if (params) {
      const id = +params;
      this.getSkill(id);
    }
  }

  getSkill(id: number): void {
    this.jobservice.getSkill(id).subscribe({
      next: (skill: Skill) => this.displaySkill(skill),
      error: (err) => (this.error = err),
    });
  }

  saveSkill(): void {
    if (this.skillForm.dirty) {
      if (this.skillForm.valid) {
        const p = { ...this.skill, ...this.skillForm.value };
        this.jobservice.updateSkill(p).subscribe({
          next: () => this.saveOnComplete(),
          error: (err) => (this.error = err),
        });
      }
    }
  }
  displaySkill(skill: Skill): void {
    this.skill = skill;
    this.skillForm.patchValue({
      Name: skill.name,
      Description: skill.description,
    });
  }

  saveOnComplete(): void {
    this.skillForm.reset();
  }
}
