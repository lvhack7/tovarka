import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { MainComponent } from './components/main/main.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { RejectedComponent } from './components/rejected/rejected.component';
import { SignContractComponent } from './components/sign-contract/sign-contract.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { VeriliveComponent } from './components/verilive/verilive.component';
import { HttpClientModule } from '@angular/common/http';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AgreementsComponent,
    ApprovedComponent,
    RejectedComponent,
    SignContractComponent,
    CheckOutComponent,
    VeriliveComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    IMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
