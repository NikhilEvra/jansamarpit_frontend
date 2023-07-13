import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewpobyidPage } from './viewpobyid.page';

const routes: Routes = [
  {
    path: '',
    component: ViewpobyidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewpobyidPageRoutingModule {}
