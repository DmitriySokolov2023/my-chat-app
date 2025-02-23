import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  getUser() {
    return localStorage.getItem('username') || '';
  }
}
