import {Component} from '@angular/core';
import {Store} from "../utils/store";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {

  balance: number = 0

  ngOnInit() {
    Store.getInstance().getBalance().then(balance => {
      this.balance = balance
    })
  }

}
