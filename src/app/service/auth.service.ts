import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user;
  changeAuth = new Subject<boolean>();
  changeProfile = new Subject<any>();
  changeCart = new Subject<any>();
  constructor( private http: HttpService,
               private router: Router) {
    this.getProfile();
  }
  // auth redirected to all page
  isAuth() {
    this.changeAuth.next(window.localStorage.getItem('token') ? true : false );
  }
  // is Login ?
  isLogin() {
    return window.localStorage.getItem('token') ? true : false;
  }
  getProfile() {
    if (this.isLogin()) {
      this.http.get('/user/profile').subscribe( data => {
        if (data['success']) {
          this.changeProfile.next(data['result']);
          this.changeCart.next(data['result'].cart);
        } else {
          console.log('vvvvvvvvvvvvv');
          console.log(data);
          this.router.navigate(['/login']);
          this.isAuth();
        }
      });
    }
  }

}
