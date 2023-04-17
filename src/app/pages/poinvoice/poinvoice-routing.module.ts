import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoinvoicePage } from './poinvoice.page';

const routes: Routes = [
  {
    path: '',
    component: PoinvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoinvoicePageRoutingModule {}
