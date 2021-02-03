import { Component, OnInit } from '@angular/core';
import { ApiclientService } from '../services/apiclient.service';
import { Response } from '../models/response';
import { DialogClientComponent } from './dialog/dialogclient.component';
import { MatDialog } from '@angular/material/dialog';
import { Client } from '../models/client';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public lst: any = [];
  public columns: string[] = ['id', 'name', 'email', 'cif', 'address', 'phone', 'completedOrders', 'actions'];
  readonly width: string = '250px';
  constructor(
    private apiClient: ApiclientService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.apiClient.getClients().subscribe(response => {
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogClientComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClients();
    });
  }

  openEdit(client: Client) {
    const dialogRef = this.dialog.open(DialogClientComponent, {
      width: this.width,
      data: client
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClients();
    });
  }

  delete(client: Client) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiClient.delete(client.id).subscribe(response => {
          if (response.exito === 1) {
            this.snackBar.open('Client deleted successfully!', '', {
              duration: 2000
            });
            this.getClients();
          }
        });
      }
    });
  }
}
