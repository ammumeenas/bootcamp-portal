import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: AuthService) {}

  public isAdmin(): Observable<boolean> {
    return this.auth.user$.pipe(
      map((user) => {
        console.log(user['http://portal/roles/role']);
        if (user['http://portal/roles/role'].includes('admin')) {
          console.log('admin');
          return true;
        } else {
          console.log('not admin');
          return false;
        }
      })
    );
  }
}
