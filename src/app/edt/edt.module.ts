import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { NgCalendarModule} from 'ionic2-calendar';
import { IonicModule } from '@ionic/angular';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { EdtPageRoutingModule } from './edt-routing.module';
import { EdtPage } from './edt.page';

registerLocaleData(localeFr, 'fr')

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdtPageRoutingModule,
  ],
  declarations: []
})
export class EdtPageModule {}
