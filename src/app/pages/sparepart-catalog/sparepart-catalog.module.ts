import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SparepartCatalogPageRoutingModule } from './sparepart-catalog-routing.module';

import { SparepartCatalogPage } from './sparepart-catalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SparepartCatalogPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SparepartCatalogPage]
})
export class SparepartCatalogPageModule {}
