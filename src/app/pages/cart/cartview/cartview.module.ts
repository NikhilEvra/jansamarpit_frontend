import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartviewPageRoutingModule } from './cartview-routing.module';

import { CartviewPage } from './cartview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartviewPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CartviewPage]
})
export class CartviewPageModule {}
