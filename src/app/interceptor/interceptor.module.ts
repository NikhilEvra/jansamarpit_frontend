import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterceptorPageRoutingModule } from './interceptor-routing.module';

import { InterceptorPage } from './interceptor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterceptorPageRoutingModule
  ],
  declarations: [InterceptorPage]
})
export class InterceptorPageModule {}
