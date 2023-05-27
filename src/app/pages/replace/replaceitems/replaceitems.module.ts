import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReplaceitemsPageRoutingModule } from './replaceitems-routing.module';

import { ReplaceitemsPage } from './replaceitems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReplaceitemsPageRoutingModule
  ],
  declarations: [ReplaceitemsPage]
})
export class ReplaceitemsPageModule {}
