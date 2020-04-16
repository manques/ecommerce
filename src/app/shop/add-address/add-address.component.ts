import {Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Address } from '../../model/address.model';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})

export class AddAddressComponent {
  spinner = false;
  states = ['jharkhand', 'bihar', 'up', 'mp'];
  addressForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: [, [Validators.required]],
    pincode: [, [Validators.required]],
    locality: ['', [Validators.required]],
    address: ['', [Validators.required]],
    town: ['', [Validators.required]],
    state: ['', [Validators.required]],
    landmark: ['' ],
    addressType: ['', [Validators.required]],
    alternativePhone: ['']
  });
  constructor(private fb: FormBuilder,
              private http: HttpService,
              private router: Router,
              private auth: AuthService) {}
  // submit form
  onSubmit() {
    this.spinner = true;
    console.log(this.addressForm);
    const address = {
      name: this.addressForm.value.name,
      phone: this.addressForm.value.phone,
      pincode: this.addressForm.value.pincode,
      locality: this.addressForm.value.locality,
      address: this.addressForm.value.address,
      town: this.addressForm.value.town,
      state: this.addressForm.value.state,
      landmark: this.addressForm.value.landmark,
      addressType: this.addressForm.value.addressType,
      alternativePhone: this.addressForm.value.alternativePhone

    };
    this.http.post('/address/add-address', address).subscribe( data => {
      console.log(data);
      if (!data['success']) {
          this.router.navigate(['login']);
      } else {
        this.auth.getProfile();
        this.router.navigate(['profile']);
      }
    });
  }
}
