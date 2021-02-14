import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAdmin!: boolean;

  constructor(public auth: AuthService) {
    const userSubscribtion = this.auth.user$.subscribe((user) => {
      console.log('user:', user);
      if (user !== null) {
        this.isAdmin = user['http://portal/roles/role'].includes('admin');
        console.log('isAdmin:', this.isAdmin);
        userSubscribtion.unsubscribe();
      }
    });
  }
}
