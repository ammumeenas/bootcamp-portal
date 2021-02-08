import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../Auth/user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  isAdmin!: boolean;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isAdmin().subscribe((data) => (this.isAdmin = data));
  }
}
