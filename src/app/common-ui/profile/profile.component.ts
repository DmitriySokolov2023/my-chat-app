import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userName: string | null = null;
  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginService.userName$.subscribe((name) => {
      this.userName = name;
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.loginService.logout();
  }
}
