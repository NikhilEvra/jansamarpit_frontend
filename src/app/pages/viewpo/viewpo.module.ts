import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewpoPageRoutingModule } from './viewpo-routing.module';

import { ViewpoPage } from './viewpo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewpoPageRoutingModule
  ],
  declarations: [ViewpoPage]
})
export class ViewpoPageModule {}
