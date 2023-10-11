import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollanswersPageRoutingModule } from './pollanswers-routing.module';

import { PollanswersPage } from './pollanswers.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PollanswersPageRoutingModule,
    TranslateModule,
    NgApexchartsModule
  ],
  declarations: [PollanswersPage]
})
export class PollanswersPageModule {}
