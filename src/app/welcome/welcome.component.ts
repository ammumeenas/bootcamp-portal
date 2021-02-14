import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { UserService } from '../Auth/user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor(public userService: UserService) {}
  ngOnInit(): void {}
}
