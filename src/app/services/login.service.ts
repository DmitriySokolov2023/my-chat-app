import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userNameSubject = new BehaviorSubject<string | null>(
    this.getUserName()
  );
  userName$ = this.userNameSubject.asObservable();
  private channel = new BroadcastChannel('login_channel');

  constructor(private router: Router) {
    this.channel.onmessage = (event) => {
      if (event.data.type === 'LOGIN') {
        localStorage.setItem('username', event.data.user);
        this.userNameSubject.next(event.data.user);
      } else if (event.data.type === 'LOGOUT') {
        localStorage.removeItem('username');
        this.userNameSubject.next(null);
      }
    };
  }

  private getUserName(): string | null {
    return localStorage.getItem('username');
  }

  login(username: string) {
    localStorage.setItem('username', username);
    this.userNameSubject.next(username);
    this.channel.postMessage({ type: 'LOGIN', user: username });
  }

  logout() {
    const userName = localStorage.getItem('username');
    if (userName) {
      this.router.navigate(['/']);
      localStorage.removeItem('username');
      this.userNameSubject.next(null);
      this.channel.postMessage({ type: 'LOGOUT' });
    }
  }
}
