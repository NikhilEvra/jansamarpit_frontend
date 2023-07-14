import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http' ;

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { InterceptorPage } from './interceptor/interceptor.page';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InAppBrowser,
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorPage, multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
