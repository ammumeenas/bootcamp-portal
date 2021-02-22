import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../models/skill.models';
import { Jobservice } from '../services/job-list.service';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css'],
})
export class SkillFormComponent implements OnInit {
  skillForm!: FormGroup;
  skills: Skill[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private jobservice: Jobservice
  ) {}

  ngOnInit(): void {
    this.skillForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: [null, Validators.required],
    });

    this.jobservice.getSkills().subscribe((skills) => (this.skills = skills));
  }

  saveSkills(): void {
    if (this.skillForm.dirty) {
      if (this.skillForm.valid) {
        const skill = this.skillForm.value;
        this.jobservice.createSkill(skill).subscribe({
          next: () => this.saveOnComplete(),
        });
      }
    }
  }
  saveOnComplete() {
    this.skillForm.reset();
  }

  deleteSkill(id: number) {
    this.jobservice.deleteSkill(id).subscribe(() => {
      const index = this.skills.findIndex((skill) => skill.id == id);
      if (index > -1) {
        this.skills.splice(index, 1);
      }
    });
  }
}
