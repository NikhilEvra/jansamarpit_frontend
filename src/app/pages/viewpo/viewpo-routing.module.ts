import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewpoPage } from './viewpo.page';

const routes: Routes = [
  {
    path: '',
    component: ViewpoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewpoPageRoutingModule {}
