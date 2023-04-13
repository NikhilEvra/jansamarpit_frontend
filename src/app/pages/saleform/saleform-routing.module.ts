import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleformPage } from './saleform.page';

const routes: Routes = [
  {
    path: '',
    component: SaleformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleformPageRoutingModule {}
