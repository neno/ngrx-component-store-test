import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ViewerModule } from './viewer/viewer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
