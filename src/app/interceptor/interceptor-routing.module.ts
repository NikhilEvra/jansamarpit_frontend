import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterceptorPage } from './interceptor.page';

const routes: Routes = [
  {
    path: '',
    component: InterceptorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterceptorPageRoutingModule {}
