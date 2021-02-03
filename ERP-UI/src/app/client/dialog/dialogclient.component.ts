import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/client';
import { ApiclientService } from 'src/app/services/apiclient.service';


@Component({
    templateUrl: 'dialogclient.component.html'
})
export class DialogClientComponent {
    public name!: string;
    public email!: string;
    public cif!: string;
    public address!: string;
    public phone!: string;
    public completedOrders!: string;
    public id!: string;

    constructor(
        public dialogRef: MatDialogRef<DialogClientComponent>,
        public apiClient: ApiclientService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public client: Client
    ) {
        if (this.client !== null) {
            this.name = client.name;
            this.email = client.email;
            this.cif = client.cif;
            this.address = client.address;
            this.phone = client.phone;
            this.completedOrders = client.completedOrders;
        }
    }

    close() {
        this.dialogRef.close();
    }

    editClient() {
        const client: Client = { name: this.name, id: this.client.id, email: this.email, cif: this.cif, phone: this.phone, address: this.address, completedOrders: this.completedOrders };
        this.apiClient.edit(client).subscribe(response => {
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Client updated successfully!', '', {
                    duration: 2000
                })
            }
        });
    }

    addClient() {
        const client: Client = { id: this.id, name: this.name, email: this.email, cif: this.cif, address: this.address, phone: this.phone, completedOrders: this.completedOrders };
        this.apiClient.add(client).subscribe(response => {
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Client added successfully!', '', {
                    duration: 2000
                })
            }
        });
    }
}