import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order';
import { ApiorderService } from 'src/app/services/apiorder.service';


@Component({
    templateUrl: 'dialogorder.component.html'
})
export class DialogOrderComponent {
    public status!: string;
    public priority!: string;
    public client!: string;
    public employee!: string;
    public dateOfCreation!: string;
    public dateOfAssignment!: string;
    public dateOfCompletion!: string;
    public address!: string;
    public price!: number;
    public id!: string;

    constructor(
        public dialogRef: MatDialogRef<DialogOrderComponent>,
        public apiOrder: ApiorderService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public order: Order
    ) {
        if (this.order !== null) {
            this.status = order.status;
            this.priority = order.priority;
            this.client = order.client;
            this.employee = order.employee;
            this.dateOfCreation = order.dateOfCreation;
            this.dateOfAssignment = order.dateOfAssignment;
            this.dateOfCompletion = order.dateOfCompletion;
            this.address = order.address;
            this.price = order.price;
        }
    }

    close() {
        this.dialogRef.close();
    }

    editOrder() {
        const order: Order = { status: this.status, id: this.order.id, priority: this.priority, client: this.client, employee: this.employee, dateOfCreation: this.dateOfCreation, dateOfAssignment: this.dateOfAssignment, dateOfCompletion: this.dateOfCompletion, address: this.address, price: this.price };
        this.apiOrder.edit(order).subscribe(response => {
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Order updated successfully!', '', {
                    duration: 2000
                })
            }
        });
    }

    addOrder() {
        const order: Order = { id: this.id, status: this.status, priority: this.priority, client: this.client, employee: this.employee, dateOfCreation: this.dateOfCreation, dateOfAssignment: this.dateOfAssignment, dateOfCompletion: this.dateOfCompletion, address: this.address, price: this.price };
        this.apiOrder.add(order).subscribe(response => {
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Order added successfully!', '', {
                    duration: 2000
                })
            }
        });
    }
}