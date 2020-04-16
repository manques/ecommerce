import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  auth;
  searchChange = false;
  searchText;
  cartItems;
  @Output() sidenavToggler = new EventEmitter();
  constructor( private router: Router,
               private authService: AuthService,
               private cart: CartService ) {}
  ngOnInit() {
    this.authService.getProfile();
    this.auth = this.authService.isLogin();
    this.authService.changeAuth.subscribe( autho => {
      this.auth = autho;
    });
    //  update number of product in cart
    this.authService.changeCart.subscribe( data => {
      this.cartItems = data;
      console.log('cart');
      console.log(this.cartItems);
    });



    // number of cart items
    // this.cart.changeCartItem.subscribe(items => {
    //   this.items = items;
    // });
    // this.items = this.cart.getItems();
    // console.log(this.items);
  }
  onChange() {
    this.searchChange = !this.searchChange;
  }
  onSearch() {
    if (this.searchText) {
      this.searchChange = false;
      this.router.navigate(['/search'], { queryParams: { searchText: this.searchText }});
      this.searchText = '';
    }
  }
  // logout
  logout() {
    window.localStorage.removeItem('token');
    this.authService.isAuth();
    this.router.navigate(['/login']);
  }
}
