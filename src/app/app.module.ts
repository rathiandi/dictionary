import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';

import { AppComponent }     from './app.component';
import { SomethingModule }  from './something/something.module';

@NgModule({
  imports: [
    BrowserModule,
    SomethingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
