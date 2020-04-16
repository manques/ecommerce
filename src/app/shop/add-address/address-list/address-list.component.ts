import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})

export class AddressListComponent implements OnInit {
  @Output() changeAddressPopup = new EventEmitter();
  auth;
  addresses;
  spinner = true;
  chooseId;
  addressSwitch = true;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.getProfile();
    this.authService.changeProfile.subscribe( profileData => {
      this.addresses = profileData.address;
      this.spinner = false;
    } );
  }

  // event occur when change address
  changeAddress(id) {
    this.changeAddressPopup.emit(id);
    console.log(id);
  }

}
