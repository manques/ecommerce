import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './auth/auth.gaurd';
import { CanActivate } from '@angular/router';
// import component
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './home/search/search.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './other/page-not-found/page-not-found.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AddProductComponent } from './product-list/add-product/add-product.component';
import { SellerProductListComponent } from './product-list/seller-product-list/seller-product-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditSellerProductComponent } from './product-list/seller-product-list/edit-seller-product/edit-seller-product.component';
import { ProductComponent } from './product-list/product/product.component';
import { CartComponent } from './shop/cart/cart.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { AddAddressComponent } from './shop/add-address/add-address.component';
import { AddressListComponent } from './shop/add-address/address-list/address-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product/:_id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGaurd] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGaurd]},
  { path: 'seller-product-list', component: SellerProductListComponent, canActivate: [AuthGaurd] },
  { path: 'edit-seller-product/:id', component: EditSellerProductComponent, canActivate: [AuthGaurd] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGaurd] },
  { path: 'add-address', component: AddAddressComponent, canActivate: [AuthGaurd] },
  { path: 'address-list', component: AddressListComponent, canActivate: [AuthGaurd]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {
  constructor() {}
}
