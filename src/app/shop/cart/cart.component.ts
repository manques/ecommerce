import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  displayedColumns: string[] = [ 'image', 'detail', 'quantity', 'delete'];
  spinner = true;
  constructor(private auth: AuthService,
              private cartService: CartService) {}
  items;
  dataSource;
  subtotal = 0;
  delivery = 50;
  total = 0;
  ngOnInit() {
    this.total = 0;
    this.auth.getProfile();
    // get cart item list
    this.auth.changeCart.subscribe(data => {
      this.spinner = false;
      this.items = data;
      console.log(this.items);
      this.dataSource = new MatTableDataSource(this.items);
      this.subtotal = 0;
      this.items.forEach(element => {
        this.subtotal += (element.quantity * element.product.price);
      });
      this.total = this.subtotal + this.delivery;
    });
  }

  // delete items
  onDelete(id) {
    this.cartService.onDelete(id);
  }
}
