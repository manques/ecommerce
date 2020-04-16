import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  spinner = true;
  user;
  isSeller;
  constructor(private http: HttpService,
              private router: Router,
              private auth: AuthService) {}
  ngOnInit() {
    this.auth.getProfile();
    this.auth.changeProfile.subscribe( data => {
      console.log(data);
      this.spinner = false;
      this.user = data;
      this.isSeller = this.user.isSeller;
    });
  }


  // on seller
  onSeller() {
    this.isSeller = !this.isSeller;
    this.http.patch('/user/isSeller', { isSeller: this.isSeller }).subscribe( data => {
      this.spinner = false;
    });
  }
}
