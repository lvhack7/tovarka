import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgreementsComponent } from './components/agreements/agreements.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MainComponent } from './components/main/main.component';
import { RejectedComponent } from './components/rejected/rejected.component';
import { SignContractComponent } from './components/sign-contract/sign-contract.component';
import { VeriliveComponent } from './components/verilive/verilive.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'agreements', component: AgreementsComponent},
  { path: 'approved', component: ApprovedComponent},
  { path: 'rejected', component: RejectedComponent},
  { path: 'contract', component: SignContractComponent},
  { path: 'check-out', component: CheckOutComponent},
  { path: 'biometry', component: VeriliveComponent},
  // { path: '',   redirectTo: '/first-component', pathMatch: 'full' },
  // { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
