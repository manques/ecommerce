import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../../../service/http.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-seller-product',
  templateUrl: './edit-seller-product.component.html',
  styleUrls: ['./edit-seller-product.component.css']
})

export class EditSellerProductComponent implements OnInit {
  // declaration
  spinner = true;
  product;
  imgUrl;
  updateProductForm;
  selectedFile;
  // constructor
  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              private fb: FormBuilder,
              private router: Router) {}
  // oninit
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpService.get(`/product/seller-product/${id}`).subscribe( data => {
      if (data['result'] === 'TokenExpiredError') {
        this.router.navigate(['/login']);
      } else {
        this.spinner = false;
        this.product = data['result'][0];
        this.imgUrl = this.product.image;
        // call
        this.onUpdateProductForm();
      }

    });
  }
  // create form
  onUpdateProductForm() {
    this.updateProductForm = this.fb.group({
      name: [ this.product.name, Validators.required ],
      price: [ this.product.price, Validators.required ],
      quantity: [ this.product.quantity, Validators.required],
      image: [this.product.image, Validators.required],
      category: [this.product.category, Validators.required],
      shortDescription: [this.product.shortDescription, Validators.required],
      features: [this.product.features],
      longDescription: [this.product.longDescription]
    });
  }

  // submit the updated data to server
  onSubmit() {
    this.spinner = true;
    const formData = new FormData();
    formData.append('token', window.localStorage.getItem('token'));
    formData.append('name', this.updateProductForm.value.name);
    formData.append('price', this.updateProductForm.value.price);
    formData.append('quantity', this.updateProductForm.value.quantity);
    formData.append('category', this.updateProductForm.value.category);
    formData.append('shortDescription', this.updateProductForm.value.shortDescription);
    formData.append('features', this.updateProductForm.value.features);
    formData.append('longDescription', this.updateProductForm.value.longDescription);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this.httpService.postFile(`/product/update/${this.product._id}`, formData).subscribe( data => {
      this.spinner = false;
      if (data['success']) {
        this.router.navigate(['\seller-product-list']);
      }
    });
  }

  // change image of product
  onChange(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = eve => {
      this.imgUrl = eve.target.result;
      console.log(this.imgUrl);
      this.updateProductForm.patchValue({
        image: this.imgUrl
      });
    };
    console.log('fsdfsdfsdfsdsfsdfsdfsdffsdfsdfsdfsdfsdfsdfsdfsfsd');
    console.log(this.updateProductForm);
  }
}
