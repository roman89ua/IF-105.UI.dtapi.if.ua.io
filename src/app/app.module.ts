import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiHttpInterceptor} from './http.interceptor';

import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiHttpInterceptor,
<<<<<<< HEAD
    multi: true,  
   }],
=======
    multi: true,

  }],
>>>>>>> 523956a01266056a7f20440d2316030816d4abe4
  bootstrap: [AppComponent]
})
export class AppModule {
}
