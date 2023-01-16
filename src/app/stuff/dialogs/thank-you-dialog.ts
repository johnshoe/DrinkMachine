import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'thank-you-dialog',
  templateUrl: './thank-you-dialog.html',
})
export class ThankYouDialog {

  refund: number = this.data

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
  }

}
