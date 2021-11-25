import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EdtPage } from './edt/edt.page';
import { ContactPage } from './contact/contact.page';
import { MapPage } from './map/map.page';
import { NgCalendarModule} from 'ionic2-calendar';
import { File } from '@ionic-native/file/ngx';
import { PopoverComponent } from './popover/popover.component';


@NgModule({
  declarations: [AppComponent, EdtPage, ContactPage, MapPage,PopoverComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,NgCalendarModule],
  providers: [File,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
