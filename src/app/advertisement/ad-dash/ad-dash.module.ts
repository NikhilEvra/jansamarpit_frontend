import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdDashPageRoutingModule } from './ad-dash-routing.module';

import { AdDashPage } from './ad-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdDashPageRoutingModule
  ],
  declarations: [AdDashPage]
})
export class AdDashPageModule {}
