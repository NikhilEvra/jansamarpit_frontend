import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalerecordPageRoutingModule } from './salerecord-routing.module';

import { SalerecordPage } from './salerecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalerecordPageRoutingModule
  ],
  declarations: [SalerecordPage]
})
export class SalerecordPageModule {}
