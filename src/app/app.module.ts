import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from './http.interceptor';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatPaginatorIntl } from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpinnerInterceptor } from './shared/services/spinner.interceptor';
import { getMatPaginatorUkr } from './shared/mat-paginator-config/mat-pagination-intl';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {provide: MatPaginatorIntl, useValue: getMatPaginatorUkr() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
