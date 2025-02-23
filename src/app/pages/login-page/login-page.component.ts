import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormComponent } from '../../common-ui/form/form.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  handleLogin(formValue: any) {
    this.loginService.login(formValue?.username || '');

    this.router.navigate(['/chat']);
  }
}
