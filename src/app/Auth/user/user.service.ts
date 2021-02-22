import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isAdmin = false;
  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  public isAuthenticated = false;

  constructor(public auth: AuthService) {
    const userSubscribtion = this.auth.user$.subscribe((user) => {
      console.log('user:', user);
      if (user !== null) {
        this._isAdmin = user['http://portal/roles/role'].includes('admin');
        console.log('isAdmin:', this.isAdmin);
        userSubscribtion.unsubscribe();
      }
    });

    const userisAuthSubscription = this.auth.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        userisAuthSubscription.unsubscribe();
      }
    );
  }
}
