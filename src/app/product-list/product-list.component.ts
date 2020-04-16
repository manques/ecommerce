import { Component, OnInit } from '@angular/core';
import { HttpService } from './../service/http.service' ;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  spinner = true;
  products;
  constructor(private http: HttpService) {}
  ngOnInit() {
    this.http.get(`/product/products`).subscribe( data => {
      if (data['success']) {
        this.spinner = false;
        this.products = data['result'];
      }
    });
  }
}
