import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleformPageRoutingModule } from './saleform-routing.module';

import { SaleformPage } from './saleform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleformPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SaleformPage]
})
export class SaleformPageModule {}
