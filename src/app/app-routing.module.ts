import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StuffComponent} from './stuff/stuff.component'
import {BalanceComponent} from "./balance/balance.component";
import {MainComponent} from "./main/main.component";
import {SlotComponent} from "./slot/slot.component";

const routes: Routes = [
  {path: 'slots', component: SlotComponent},
  {
    path: 'stuffs', component: StuffComponent,
    children: [
      {
        path: '',
        component: StuffComponent
      },
      {
        path: ':amount',
        component: StuffComponent
      }

    ]

  },
  {path: 'balance', component: BalanceComponent},
  {path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
