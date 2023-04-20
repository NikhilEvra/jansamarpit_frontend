import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewcomplaintPage } from './viewcomplaint.page';

const routes: Routes = [
  {
    path: '',
    component: ViewcomplaintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewcomplaintPageRoutingModule {}
