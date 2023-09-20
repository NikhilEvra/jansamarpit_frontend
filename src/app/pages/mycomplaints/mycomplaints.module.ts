import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycomplaintsPageRoutingModule } from './mycomplaints-routing.module';

import { MycomplaintsPage } from './mycomplaints.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycomplaintsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [MycomplaintsPage]
})
export class MycomplaintsPageModule {}
