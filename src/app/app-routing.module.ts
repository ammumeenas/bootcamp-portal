import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterceptorService } from './Auth/interceptor.service';
import { CandidateCreateProfileComponent } from './candidate-create-profile/candidate-create-profile.component';
import { CandidateEditFormComponent } from './candidate-Editform/candidate-Editform.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobListComponent } from './job-list/job-list.component';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { SkillFormComponent } from './skill-form/skill-form.component';

const routes: Routes = [
  {
    path: 'job',
    component: JobListComponent,
  },
  {
    path: 'jobform',
    component: JobFormComponent,
  },
  {
    path: 'job/:id',
    component: JobDetailsComponent,
  },
  {
    path: 'job/:id/edit',
    component: JobEditComponent,
  },
  {
    path: 'candidate',
    component: CandidateProfileComponent,
  },
  {
    path: 'candidate/edit',
    component: CandidateEditFormComponent,
  },
  {
    path: 'skill',
    component: SkillFormComponent,
  },
  {
    path: 'skill/:id/edit',
    component: SkillEditComponent,
  },
  {
    path: 'profile',
    component: CandidateCreateProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
