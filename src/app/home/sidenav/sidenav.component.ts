import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  light = false;
  auth;
  @Output() sidenavClose = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.auth = window.localStorage.getItem('token') ? true : false;
    this.authService.changeAuth.subscribe( autho => {
      this.auth = autho;
    });
  }

  logout() {
    window.localStorage.removeItem('token');
    this.authService.isAuth();
    this.sidenavClose.emit();
    this.router.navigate(['/login']);
  }
}
