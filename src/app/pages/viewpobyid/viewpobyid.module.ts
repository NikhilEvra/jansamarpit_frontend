import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewpobyidPageRoutingModule } from './viewpobyid-routing.module';

import { ViewpobyidPage } from './viewpobyid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewpobyidPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewpobyidPage]
})
export class ViewpobyidPageModule {}
