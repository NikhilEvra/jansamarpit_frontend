import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestcallbackPage } from './requestcallback.page';

const routes: Routes = [
  {
    path: '',
    component: RequestcallbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestcallbackPageRoutingModule {}
