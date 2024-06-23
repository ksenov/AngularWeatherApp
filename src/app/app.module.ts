import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConvertToCelsiusPipe } from './pipes/convertToCelsius.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({ declarations: [
        AppComponent,
        ConvertToCelsiusPipe
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
