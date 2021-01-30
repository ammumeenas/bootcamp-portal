import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterceptorService } from './Auth/interceptor.service';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobListComponent } from './job-list/job-list.component';

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
