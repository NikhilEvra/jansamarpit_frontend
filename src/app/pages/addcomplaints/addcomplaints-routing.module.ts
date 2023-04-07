import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcomplaintsPage } from './addcomplaints.page';

const routes: Routes = [
  {
    path: '',
    component: AddcomplaintsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcomplaintsPageRoutingModule {}
