import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClosedcomplaintPage } from './closedcomplaint.page';

const routes: Routes = [
  {
    path: '',
    component: ClosedcomplaintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClosedcomplaintPageRoutingModule {}
