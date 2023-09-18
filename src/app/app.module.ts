import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http' ;

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { InterceptorPage } from './interceptor/interceptor.page';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core';

import { Vibration } from '@ionic-native/vibration/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core'; 
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';



export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json'); 
}


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InAppBrowser, TextToSpeech,AwesomeCordovaNativePlugin,Vibration,Camera,
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorPage, multi: true
    },
  importProvidersFrom(TranslateModule.forRoot(
    {
      loader:{
        provide:TranslateLoader,
        useFactory: createTranslateLoader,
        deps:[HttpClient]
      }
    }
  ))

],
  bootstrap: [AppComponent],
})
export class AppModule {}
