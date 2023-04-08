import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpencomplaintsPage } from './opencomplaints.page';

const routes: Routes = [
  {
    path: '',
    component: OpencomplaintsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpencomplaintsPageRoutingModule {}
