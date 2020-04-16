import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})

export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('pro') divPro: ElementRef;
  spinner = false;
  user;
  carts;
  total = 0;
  // final result need variable
  auth;
  addressId;
  constructor( private authService: AuthService,
               private http: HttpService,
               private router: Router ) {}
  ngOnInit() {
    this.total = 0;
    // get all details
    this.authService.getProfile();
    // check is user is login
    this.auth = this.authService.isLogin();
    // subscibe when user login
    this.authService.changeAuth.subscribe( loginData => {
      this.auth = loginData;
    } );
    // get profile
    this.authService.changeProfile.subscribe( profileData => {
      this.user = profileData;
      this.carts = this.user.cart;
      console.log(this.carts);
      console.log(this.user);
      this.total = 0;
      this.carts.forEach(element => {
        console.log(element.quantity);
        console.log(element.product.price);
        this.total += (element.quantity * element.product.price);
      });
    });
  }

  // element
  ngAfterViewInit() {
    console.log(this.divPro);
    this.divPro.nativeElement.scrollLeft += 200;
    console.log(this.divPro.nativeElement.scrollLeft);
  }

  // get address id from second step
  onAddress(id) {
    this.addressId = id;
    console.log(this.addressId);
    console.log('sdsf');
  }
  onContinueForPayment() {
    this.http.post('/shopping/shopping-address', { shoppingid: this.addressId}).subscribe( data => {
      if (data['success']) {
        this.router.navigate(['/payment']);
      }
    });
  }
}
