import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  data;
  spinner = false;
  pass = true;
  success = false;
  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    isSeller: ['']
  });
  constructor(private fb: FormBuilder, private http: HttpService) {}
  // submit form
  onSubmit() {
    this.spinner = true;
    this.http.post('/user/signup', {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      phone: this.signupForm.value.phone,
      password: this.signupForm.value.password,
      isSeller: this.signupForm.value.isSeller
    }).subscribe( data => {
      this.spinner = false;
      this.data = data;
      this.success = true;
    });
  }

  // check confirm password
  onConfirm() {
    if ((this.signupForm.value.password === this.signupForm.value.confirmPassword) && (this.signupForm.controls.password.valid )) {
      return true;
    }
    return false;
  }
  back() {
    this.success = false;
  }

}
