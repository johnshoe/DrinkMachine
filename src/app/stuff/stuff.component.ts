import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Coin, DrinkData, Pipe} from "./types";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {COINT_TYPES, DRINKS, INIT_BALANCE, PIPES_DATA} from "../constants";
import {Store} from "../utils/store";
import {MatDialog} from "@angular/material/dialog";
import {RefundDialog} from "./dialogs/refund-dialog";
import {NeedMoreMoneyDialog} from "./dialogs/need-more-money-dialog";
import {ThankYouDialog} from "./dialogs/thank-you-dialog";
import {TooManyMoneyDialog} from "../slot/dialogs/too-many-money-dialog";

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.scss']
})

export class StuffComponent {

  displayedColumns: string[] = ['id', 'name', 'price'];
  dataSource: MatTableDataSource<DrinkData>;
  balance: number = 0
  clickedRows = new Set<DrinkData>();
  currentSelectedRow: DrinkData | undefined;
  pipes: Pipe[] = [];
  currentAmount: number = 0;
  insertedCoins: [] = []
  change: number = 0;
  price: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(DRINKS);
  }

  generateNewPipeData(pipe: Pipe, coin: number, valueCount: number): Pipe {
    let newPipe: Pipe = {} as Pipe
    if (pipe.name === coin) {
      if (valueCount > 0 && pipe.coinCount >= valueCount) {
        let newCount = pipe.coinCount - valueCount
        newPipe = Object.assign({}, pipe, {coinCount: newCount})
      }
    }
    return newPipe
  }

  calculateRefundCoins(): Coin[] {
    let remnant: number = this.change
    let refund: Coin[] = []
    COINT_TYPES.forEach(value => {
      let valueCount = Math.floor(remnant / value)
      remnant = remnant % value
      refund.push({coin: value, count: valueCount} as Coin)
    })
    console.log("Refunds ", refund)
    return refund
  }

  getCoinsFromParams(params: Params) {
    let coins: Coin[] = []
    Object.keys(params).forEach(key => {
      if (key.includes("ic")) {
        let coinType: number = Number(key.split("_")[1])
        let coinCount: number = params[key]
        coins.push({coin: coinType, count: coinCount} as Coin)
      }
    })
    return coins
  }

  saveCalculatedPipes(calculated: Pipe[]) {
    calculated.reverse()
    this.pipes = calculated
    Store.getInstance().setPipeData(calculated)
  }

  calculatePipesAfterRefund() {
    if (this.change > 0) {
      const refund: Coin[] = this.calculateRefundCoins()
      this.dialog.open(RefundDialog, {data: this.change}).afterClosed().subscribe(() => {
        let newPipes: Pipe[] = [];
        refund.forEach(coin => {
          this.pipes.forEach(pipe => {
            if (pipe.name === coin.coin) {
              newPipes.push({name: pipe.name, title: pipe.title, coinCount: pipe.coinCount - coin.count} as Pipe)
            }
          })
        })
        this.saveCalculatedPipes(newPipes)
      })
    } else {
      this.dialog.open(RefundDialog, {data: this.change})
    }
  }

  calculatePipesByParams(params: Params) {
    let newPipes: Pipe[] = [];
    const coins: Coin[] = this.getCoinsFromParams(params)
    coins.forEach(coin => {
      this.pipes.forEach(pipe => {
        if (pipe.name === coin.coin) {
          let cc: number = Number(pipe.coinCount) < 10 ? Number(pipe.coinCount) + Number(coin.count) : Number(pipe.coinCount)
          newPipes.push({name: pipe.name, title: pipe.title, coinCount: cc} as Pipe)
        }
      })
    })
    this.saveCalculatedPipes(newPipes)
  }

  updateBalance(actualPrice: number) {
    Store.getInstance().getBalance().then(storedBalance => {
      let balance: number = Number(storedBalance) + Number(actualPrice)
      this.balance = balance
      Store.getInstance().setBalance(balance)
    })
  }

  availableChange() {
    return Store.getInstance().getPipeData().then(pipes => {
      return pipes.reduce((result, item) => {
        return result + (item.coinCount * item.name)
      }, 0)
    })
  }

  clickRow(row: DrinkData) {
    if (row.price > this.currentAmount) {
      this.dialog.open(NeedMoreMoneyDialog)
    } else {
      this.clickedRows.add(row)
      this.currentSelectedRow = row
      this.change = this.currentAmount - row.price
      this.price = row.price
      this.availableChange().then(change => {
        if (change > this.change) {
          this.calculatePipesAfterRefund()
          this.updateBalance(row.price)
        } else {
          this.dialog.open(TooManyMoneyDialog).afterClosed().subscribe(() => {
            this.router.navigate(['/slots'])
          })
        }
      })

    }
  }

  clickNext(event: Event) {
    this.dialog.open(ThankYouDialog).afterClosed().subscribe(() => {
      this.router.navigate(['/balance'])
    })
  }

  clickCancel(event: Event) {
    this.router.navigate(['/slots'])
  }

  ngOnInit() {
    Store.getInstance().hasStore().then(exists => {
      if (!exists) {
        this.pipes = PIPES_DATA
        this.balance = INIT_BALANCE
      } else {
        Store.getInstance().getStoredData().then(storedData => {
          this.pipes = storedData.pipes
          this.balance = storedData.balance
          this.route.queryParams.subscribe(params => {
            if (Object.keys(params).length > 0) {
              this.currentAmount = params['amount']
              this.calculatePipesByParams(params)
            }
          });
        })
      }
    });


  }

}

