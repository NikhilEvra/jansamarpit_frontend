import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cart1Page } from './cart1.page';

const routes: Routes = [
  {
    path: '',
    component: Cart1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cart1PageRoutingModule {}
