import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VarientinventoryPageRoutingModule } from './varientinventory-routing.module';

import { VarientinventoryPage } from './varientinventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VarientinventoryPageRoutingModule
  ],
  declarations: [VarientinventoryPage]
})
export class VarientinventoryPageModule {}
