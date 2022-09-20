import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { ViewerComponent } from './viewer.component';
import { PageComponent } from './page/page.component';
import { UiStore } from './ui.store';



@NgModule({
  declarations: [
    ViewerComponent,
    PageComponent
  ],
  providers: [
    UiStore
  ],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [
    ViewerComponent
  ]
})
export class ViewerModule { }
