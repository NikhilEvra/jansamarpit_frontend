import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycomplaintsPage } from './mycomplaints.page';

const routes: Routes = [
  {
    path: '',
    component: MycomplaintsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycomplaintsPageRoutingModule {}
