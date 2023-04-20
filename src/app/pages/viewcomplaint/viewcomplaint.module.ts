import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewcomplaintPageRoutingModule } from './viewcomplaint-routing.module';

import { ViewcomplaintPage } from './viewcomplaint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewcomplaintPageRoutingModule
  ],
  declarations: [ViewcomplaintPage]
})
export class ViewcomplaintPageModule {}
