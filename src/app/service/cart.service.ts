import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item.model';
import { Product } from '../model/product.model';
import { Subject } from 'rxjs';
import { HttpService } from '../service/http.service';
import { AuthService } from '../service/auth.service';
import { ProductComponent } from '../product-list/product/product.component';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  constructor(private auth: AuthService,
              private http: HttpService,
              private router: Router) {}
  // add to cart start
  onAddToCart(item) {
    // login login
    if (this.auth.isLogin()) {
      // work on server
      this.onServer(item);
    } else {
      // work on local storage
      this.onLocalStorage(item);
    }
  }
  // on server
  onServer(item) {
    console.log(item);
    console.log(item.product._id);
    console.log(item.quantity);
    this.http.post('/cart/add-cart', {
      _id: item.product._id,
      quantity: item.quantity,
      price: item.price
    }).subscribe( data => {
      // token expire check
      if (data['result'] === 'TokenExpiredError') {
        this.router.navigate(['/login']);
      } else {
        if (data['success'] === true) {
          this.auth.getProfile();
        } else {

        }
      }
    });
  }
  // on localStorage
  onLocalStorage(item) {

  }

  // on Delete cart item
  onDelete(id) {
    this.http.delete(`/cart/delete/${id}`).subscribe( data => {
      console.log(data);
      if (data['success']) {
        this.auth.getProfile();
      }
    });
  }


}
