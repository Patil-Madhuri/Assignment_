import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppMaterial } from './app-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminScreenComponent } from './components/admin-screen/admin-screen.component';
import { AddComponent } from './components/add/add.component';
import { OrderComponent } from './components/order/order.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from 'src/app/shared-modules/api.service'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AdminScreenComponent,
    AddComponent,
    OrderComponent,
    ViewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterial,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiService, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent]
})
export class AppModule { }
