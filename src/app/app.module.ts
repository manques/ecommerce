import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// import module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing.module';
import { AppMaterialModule } from './app-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { SearchComponent } from './home/search/search.component';
import { FooterComponent } from './home/footer/footer.component';
import { StickyFooterComponent } from './home/footer/sticky-footer/sticky-footer.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PageNotFoundComponent } from './other/page-not-found/page-not-found.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AddProductComponent } from './product-list/add-product/add-product.component';
import { SellerProductListComponent } from './product-list/seller-product-list/seller-product-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditSellerProductComponent } from './product-list/seller-product-list/edit-seller-product/edit-seller-product.component';
import { ProductComponent } from './product-list/product/product.component';
import { CartComponent  } from './shop/cart/cart.component';
import { CheckoutComponent} from './shop/checkout/checkout.component';
import { AddAddressComponent } from './shop/add-address/add-address.component';
import { AddressListComponent } from './shop/add-address/address-list/address-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    SearchComponent,
    FooterComponent,
    StickyFooterComponent,
    CarouselComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    ProfileComponent,
    AddProductComponent,
    SellerProductListComponent,
    ProductListComponent,
    EditSellerProductComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    AddAddressComponent,
    AddressListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
