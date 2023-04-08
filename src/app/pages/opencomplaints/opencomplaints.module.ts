import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpencomplaintsPageRoutingModule } from './opencomplaints-routing.module';

import { OpencomplaintsPage } from './opencomplaints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpencomplaintsPageRoutingModule
  ],
  declarations: [OpencomplaintsPage]
})
export class OpencomplaintsPageModule {}
