import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdDashPageRoutingModule } from './ad-dash-routing.module';

import { AdDashPage } from './ad-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdDashPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdDashPage],
  providers:[DatePipe]
})
export class AdDashPageModule {}
