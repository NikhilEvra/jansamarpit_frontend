import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReplaceitemsPage } from './replaceitems.page';

const routes: Routes = [
  {
    path: '',
    component: ReplaceitemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReplaceitemsPageRoutingModule {}
