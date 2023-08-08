import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdDashPage } from './ad-dash.page';

const routes: Routes = [
  {
    path: '',
    component: AdDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdDashPageRoutingModule {}
