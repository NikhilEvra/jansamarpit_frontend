import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycomplaintsPageRoutingModule } from './mycomplaints-routing.module';

import { MycomplaintsPage } from './mycomplaints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycomplaintsPageRoutingModule
  ],
  declarations: [MycomplaintsPage]
})
export class MycomplaintsPageModule {}
