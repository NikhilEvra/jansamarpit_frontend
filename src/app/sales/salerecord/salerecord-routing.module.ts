import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalerecordPage } from './salerecord.page';

const routes: Routes = [
  {
    path: '',
    component: SalerecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalerecordPageRoutingModule {}
