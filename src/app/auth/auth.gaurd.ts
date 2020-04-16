import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGaurd implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      console.log(this.islogin());
      return this.islogin();
  }

  islogin() {
    if (this.authService.isLogin()) { return true; }
    this.router.navigate(['/login']);
    return false;
  }
}
