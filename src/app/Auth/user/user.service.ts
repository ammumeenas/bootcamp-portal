import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: AuthService) {}

  public isAdmin(): Observable<boolean> {
    return this.auth.user$.pipe(
      map((user) => {
        console.log('user is', user);
        if (user['http://portal/roles/role'].includes('admin')) {
          return true;
        } else {
          console.log('not admin');
          return false;
        }
      })
    );
  }
}
