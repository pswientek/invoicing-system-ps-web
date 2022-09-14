import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompanyListComponent } from './company-list/company-list.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    InvoiceListComponent,
    HomePageComponent,
    InvoiceDetailComponent,
    InvoiceEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
    {path: 'company-list', component: CompanyListComponent},
    {path: 'invoice-list', component: InvoiceListComponent},
    {path: 'home-page', component: HomePageComponent},
    {path: 'invoice-detail', component: InvoiceDetailComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
