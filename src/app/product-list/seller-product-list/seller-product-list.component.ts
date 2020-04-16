import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { AuthService } from '../../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.css']
})
export class SellerProductListComponent implements OnInit {
  spinner = true;
  products;
  dataSource;
  displayColumns = [ 'image', 'name', 'quantity', 'edit', 'delete'];
  constructor(private http: HttpService,
              private auth: AuthService,
              private router: Router) {}
  ngOnInit() {
    this.onList();
  }

  //  on product lis
  onList() {
    this.http.get('/product/seller-product-list').subscribe( data => {
      if (data['result'] === 'TokenExpiredError') {
          this.router.navigate(['/login']);
      } else {
        this.spinner = false;
        this.products = data['result'];
        console.table(this.products);
        this.dataSource = new MatTableDataSource(this.products);
      }
    });
  }

  // delete product by id
  onDelete(id) {
    this.spinner =  true;
    console.log(id);
    this.http.delete(`/product/delete/${id}`). subscribe( data => {
      console.log(data);
      if (data['success']) {
        this.spinner = false;
        this.onList();
      }
    });
  }

}
