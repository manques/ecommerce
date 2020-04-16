import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  spinner = false;
  imgUrl;
  categories = ['electronic', 'tv & appliances', 'men', 'women', 'baby & kids', 'home & furniture', 'sports', 'books'];
  selectedFile;
  productForm = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    quantity: ['', Validators.required],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]],
    shortDescription: ['', Validators.required],
    features: [''],
    longDescription: [''],
  });
  constructor(private fb: FormBuilder,
              private http: HttpService,
              private router: Router) {}
  // submit to  add product to server
  onSubmit() {
    this.spinner = true;
    console.log(this.productForm);
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('quantity', this.productForm.value.quantity);
    formData.append('category', this.productForm.value.category);
    formData.append('image', this.selectedFile);
    formData.append('shortDescription', this.productForm.value.shortDescription);
    formData.append('features', this.productForm.value.features);
    formData.append('longDescription', this.productForm.value.longDescription);
    formData.append('token', window.localStorage.getItem('token'));
    // post product data into server
    this.http.postFile('/product/add-product', formData).subscribe( data => {
      this.spinner = false;
      if (data['success']) {
          this.router.navigate(['/seller-product-list']);
      } else {
        console.log(data);
      }
    });
  }
  // image file change
  onChange(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (eve) => {
      this.imgUrl = eve.target.result;
      this.onImage();
    };
    this.onImage();
  }
  // update form image
  onImage() {
    this.productForm.patchValue({ image: this.imgUrl });
  }
}
