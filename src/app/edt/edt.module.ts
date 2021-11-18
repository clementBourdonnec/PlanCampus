import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgCalendarModule} from 'ionic2-calendar';
import { IonicModule } from '@ionic/angular';

import { EdtPageRoutingModule } from './edt-routing.module';

import { EdtPage } from './edt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdtPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [EdtPage]
})
export class EdtPageModule {}
