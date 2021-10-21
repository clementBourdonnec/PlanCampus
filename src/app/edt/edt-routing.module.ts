import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdtPage } from './edt.page';

const routes: Routes = [
  {
    path: '',
    component: EdtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdtPageRoutingModule {}
