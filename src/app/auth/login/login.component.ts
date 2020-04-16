import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  spinner = false;
  pass = false;
  success = false;
  data;
  // login form
  loginForm = this.fb.group({
    emailPhone: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
              private http: HttpService,
              private router: Router,
              private authService: AuthService) {}
  ngOnInit() {
    window.localStorage.removeItem('token');
    this.authService.isAuth();
  }

  onSubmit() {
    this.spinner = true;
    this.http.post('/user/login', {
      emailPhone: this.loginForm.value.emailPhone,
      password: this.loginForm.value.password
    }).subscribe( data => {
      this.spinner = false;
      if (data['success']) {
        window.localStorage.setItem('token', 'helpect' + data['token']);
        this.authService.isAuth();
        this.router.navigate(['']);
        this.authService.getProfile();
      } else {
        this.success = true;
        this.data = data;
      }
    });
  }
  // back
  back() {
    this.success = false;
  }
}
