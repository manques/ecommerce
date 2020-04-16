import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  spinner = true;
  product;
  quantity = 1;
  quantityWarning = 'max 10 quantity allowed!!';
  constructor( private route: ActivatedRoute,
               private http: HttpService,
               private router: Router,
               private cart: CartService ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('_id');
    this.http.get(`/product/product/${id}`).subscribe( data => {
      if (data['result'] === 'TokenExpiredError') {
        this.router.navigate(['/login']);
      } else {
        this.spinner = false;
        this.product = data['result'][0];
      }
    });
  }
  // product add to cart
  onAddToCart(product) {
    this.cart.onAddToCart({
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        category: product.category,
        shortDescription: product.shortDescription,
        features: product.features,
        longDescription: product.longDescription
      },
      quantity: this.quantity,
      price: product.price * this.quantity
    });
  }

}
