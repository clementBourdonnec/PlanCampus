import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EdtPage } from './edt/edt.page';
import { ContactPage } from './contact/contact.page';
import { MapPage } from './map/map.page';

import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [AppComponent, EdtPage, ContactPage, MapPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
