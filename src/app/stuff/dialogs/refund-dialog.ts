import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'refund-dialog',
  templateUrl: './refund-dialog.html',
})
export class RefundDialog {

  refund: number = this.data

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
  }

}
