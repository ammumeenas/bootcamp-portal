import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JobListComponent } from './job-list/job-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './Auth/auth-button/auth-button.component';
import { UserProfileComponent } from './Auth/auth-button/User-Profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CandidateEditFormComponent } from './candidate-Editform/candidate-Editform.component';
import { UserService } from './Auth/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobFormComponent,
    JobDetailsComponent,
    JobEditComponent,
    AuthButtonComponent,
    UserProfileComponent,
    WelcomeComponent,
    CandidateProfileComponent,
    CandidateEditFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,

    AuthModule.forRoot({
      domain: 'dev-2frg9r3p.us.auth0.com',
      clientId: 'HDZX3o5Afvoq9GMuIEa9btHUnQLUQwrU',
      audience: 'http://localhost:5000',
    }),

    NgbModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
