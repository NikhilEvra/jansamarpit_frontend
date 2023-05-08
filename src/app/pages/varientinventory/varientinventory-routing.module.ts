import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VarientinventoryPage } from './varientinventory.page';

const routes: Routes = [
  {
    path: '',
    component: VarientinventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VarientinventoryPageRoutingModule {}
