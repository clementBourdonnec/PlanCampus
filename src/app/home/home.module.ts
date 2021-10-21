import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ContactPageModule } from '../contact/contact.module';
import { MapPageModule } from '../map/map.module';
import { MapPage } from '../map/map.page';
import { ContactPage } from '../contact/contact.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: []
})
export class HomePageModule {}
