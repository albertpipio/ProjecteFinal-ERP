import { Component, OnInit } from '@angular/core';
import { ApiwarehouseService } from '../services/apiwarehouse.service';
import { Response } from '../models/response';
import { DialogWarehouseComponent } from './dialog/dialogwarehouse.component';
import { MatDialog } from '@angular/material/dialog';
import { Warehouse } from '../models/warehouse';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  public lst: any = [];
  public columns: string[] = ['id', 'category', 'actions'];
  readonly width: string = '300px';
  constructor(
    private apiWarehouse: ApiwarehouseService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getWarehouse();
  }

  getWarehouse() {
    this.apiWarehouse.getWarehouse().subscribe(response => {
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogWarehouseComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getWarehouse();
    });
  }

  openEdit(warehouse: Warehouse) {
    const dialogRef = this.dialog.open(DialogWarehouseComponent, {
      width: this.width,
      data: warehouse
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getWarehouse();
    });
  }

  delete(warehouse: Warehouse) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiWarehouse.delete(warehouse.id).subscribe(response => {
          if (response.exito === 1) {
            this.snackBar.open('Item deleted successfully!', '', {
              duration: 2000
            });
            this.getWarehouse();
          }
        });
      }
    });
  }
}
