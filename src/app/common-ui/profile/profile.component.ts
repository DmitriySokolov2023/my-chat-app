import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userName: string | null = null;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.userName$.subscribe((name) => {
      this.userName = name;
    });
  }

  logout() {
    this.loginService.logout();
  }
}
