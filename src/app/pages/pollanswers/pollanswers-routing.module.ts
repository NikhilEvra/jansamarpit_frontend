import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollanswersPage } from './pollanswers.page';

const routes: Routes = [
  {
    path: '',
    component: PollanswersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollanswersPageRoutingModule {}
