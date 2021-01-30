import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: ` <ul *ngIf="auth.user$ | async as user">
    <li>{{ user.name }}</li>
    <li>{{ user.email }}</li>
  </ul>`,
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((data) => console.log(data));
  }
}
