import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoinvoicePageRoutingModule } from './poinvoice-routing.module';

import { PoinvoicePage } from './poinvoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoinvoicePageRoutingModule
  ],
  declarations: [PoinvoicePage]
})
export class PoinvoicePageModule {}
