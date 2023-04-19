import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClosedcomplaintPageRoutingModule } from './closedcomplaint-routing.module';

import { ClosedcomplaintPage } from './closedcomplaint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClosedcomplaintPageRoutingModule
  ],
  declarations: [ClosedcomplaintPage]
})
export class ClosedcomplaintPageModule {}
