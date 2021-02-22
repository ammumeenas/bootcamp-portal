import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: ` <div *ngIf="auth.user$ | async as user">Hi {{ user.name }}</div>`,
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
