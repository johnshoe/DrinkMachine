import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "../utils/store";
import {DRINKS, INIT_BALANCE, PIPES_DATA} from "../constants";
import {DrinkData} from "../stuff/types";
import {MatDialog} from "@angular/material/dialog";
import {NotEnoughAmountDialog} from "./dialogs/not-enough-amount-dialog";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent {
  amount: number = 0;
  inserted_coin_5: number = 0;
  inserted_coin_10: number = 0;
  inserted_coin_20: number = 0;
  inserted_coin_50: number = 0;
  inserted_coin_100: number = 0;
  inserted_coin_200: number = 0;
  currentSummaryCoins = 0;
  insertedMoney = false

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  clickInsertMoney(event: Event, moneyType: string, sum: number) {
    this.amount += sum;
    this.insertedMoney = true
    if (moneyType === 'coin') {
      const strVar = "inserted_coin_" + sum
      // @ts-ignore
      this[strVar] += 1;
    }

    setTimeout(() => {
      this.insertedMoney = false
    }, 300)
  }

  amountIsEnough(amount: number) {
    let min = Math.min(...DRINKS.map(item => item.price))
    let result: DrinkData = DRINKS.filter(item => item.price === min)[0]
    if (amount >= result.price) {
      return true
    }
    return false
  }

  clickNext(event: Event) {
    if (this.amountIsEnough(this.amount)) {
      Store.getInstance().setAmount(this.amount)
      this.router.navigate(['/stuffs'], {
        queryParams:
          {
            amount: this.amount,
            ic_5: this.inserted_coin_5,
            ic_10: this.inserted_coin_10,
            ic_20: this.inserted_coin_20,
            ic_50: this.inserted_coin_50,
            ic_100: this.inserted_coin_100,
            ic_200: this.inserted_coin_200,
          }
      })
    } else {
      this.dialog.open(NotEnoughAmountDialog)
    }
  }

  clickReset(event: Event) {
    Store.getInstance().clearAmount().then(() => {
      this.amount = 0;
      [5, 10, 20, 50, 100, 200].forEach(i => {
        const strVar = "inserted_coin_" + i
        // @ts-ignore
        this[strVar] = 0
      });
    })
  }

  ngOnInit() {
    const store = Store.getInstance()
    store.hasStore().then(exists => {
      if (!exists) {
        store.setBalance(INIT_BALANCE)
        store.clearAmount()
        store.setPipeData(PIPES_DATA)
      }
    })
    Store.getInstance().getAmount().then(amount => {
      this.amount = amount
    })
  }
}
