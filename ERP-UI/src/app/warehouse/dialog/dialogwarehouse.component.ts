import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Warehouse } from 'src/app/models/warehouse';
import { ApiwarehouseService } from 'src/app/services/apiwarehouse.service';


@Component({
    templateUrl: 'dialogwarehouse.component.html'
})
export class DialogWarehouseComponent {
    public category!: string;
    public id!: string;

    constructor(
        public dialogRef: MatDialogRef<DialogWarehouseComponent>,
        public apiWarehouse: ApiwarehouseService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public warehouse: Warehouse
    ) {
        if (this.warehouse !== null) {
            this.category = warehouse.category;
        }
    }

    close() {
        this.dialogRef.close();
    }

    editWarehouse() {
        const warehouse: Warehouse = { category: this.category, id: this.warehouse.id };
        this.apiWarehouse.edit(warehouse).subscribe(response => {
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Item updated successfully!', '', {
                    duration: 2000
                })
            }
        });
    }

    addWarehouse() {
        const warehouse: Warehouse = { id: this.id, category: this.category };
        this.apiWarehouse.add(warehouse).subscribe(response => {
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Item added successfully!', '', {
                    duration: 2000
                })
            }
        });
    }
}