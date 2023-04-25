import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cart1PageRoutingModule } from './cart1-routing.module';

import { Cart1Page } from './cart1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cart1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Cart1Page]
})
export class Cart1PageModule {}
