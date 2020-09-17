import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {SailModelApiService} from './sailModel/sailModel-api.service';
import {ExistingStateApiService} from './existingState/existingState.service';
import {SailCommandApiService} from './sailCommand/sailCommand.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [SailModelApiService, 
              ExistingStateApiService, 
              SailCommandApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}