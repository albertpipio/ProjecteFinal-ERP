import { Component, OnInit } from '@angular/core';
import { ApiorderService } from '../services/apiorder.service';
import { Response } from '../models/response';
import { DialogOrderComponent } from './dialog/dialogorder.component';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../models/order';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public lst: any = [];
  public columns: string[] = ['id', 'status', 'priority', 'client', 'employee', 'dateOfCreation', 'dateOfAssignment', 'dateOfCompletion', 'address', 'price', 'actions'];
  readonly width: string = '250px';
  constructor(
    private apiOrder: ApiorderService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.apiOrder.getOrders().subscribe(response => {
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogOrderComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOrders();
    });
  }

  openEdit(order: Order) {
    const dialogRef = this.dialog.open(DialogOrderComponent, {
      width: this.width,
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOrders();
    });
  }

  delete(order: Order) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiOrder.delete(order.id).subscribe(response => {
          if (response.exito === 1) {
            this.snackBar.open('Order deleted successfully!', '', {
              duration: 2000
            });
            this.getOrders();
          }
        });
      }
    });
  }
}
