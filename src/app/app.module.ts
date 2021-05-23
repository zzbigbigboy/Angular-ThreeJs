import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Model1Component } from './model1/model1.component';
import { CloudsComponent } from './clouds/clouds.component';
import { IframeComponent } from './iframe/iframe.component';

@NgModule({
  declarations: [
    AppComponent,
    Model1Component,
    CloudsComponent,
    IframeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
