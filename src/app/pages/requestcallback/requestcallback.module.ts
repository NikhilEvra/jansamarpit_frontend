import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestcallbackPageRoutingModule } from './requestcallback-routing.module';

import { RequestcallbackPage } from './requestcallback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestcallbackPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RequestcallbackPage]
})
export class RequestcallbackPageModule {}
