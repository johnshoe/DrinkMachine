import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StuffComponent} from './stuff/stuff.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {BalanceComponent} from './balance/balance.component';
import {MainComponent} from './main/main.component';
import {MatTableModule} from "@angular/material/table";
import {SlotComponent} from './slot/slot.component';
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {NotEnoughAmountDialog} from "./slot/dialogs/not-enough-amount-dialog";
import {RefundDialog} from "./stuff/dialogs/refund-dialog";
import {NeedMoreMoneyDialog} from "./stuff/dialogs/need-more-money-dialog";
import {ThankYouDialog} from "./stuff/dialogs/thank-you-dialog";
import {TooManyMoneyDialog} from "./slot/dialogs/too-many-money-dialog";

@NgModule({
  declarations: [
    AppComponent,
    StuffComponent,
    BalanceComponent,
    MainComponent,
    SlotComponent,
    NotEnoughAmountDialog,
    RefundDialog,
    NeedMoreMoneyDialog,
    ThankYouDialog,
    TooManyMoneyDialog
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
