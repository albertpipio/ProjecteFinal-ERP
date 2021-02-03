import { Component, OnInit } from '@angular/core';
import { ApiemployeeService } from '../services/apiemployee.service';
import { Response } from '../models/response';
import { DialogEmployeeComponent } from './dialog/dialogemployee.component';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../models/employee';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public lst: any = [];
  public columns: string[] = ['id', 'name', 'surname', 'email', 'pastOrders', 'completedOrders', 'salary', 'actions'];
  readonly width: string = '250px';
  constructor(
    private apiEmployee: ApiemployeeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.apiEmployee.getEmployees().subscribe(response => {
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogEmployeeComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getEmployees();
    });
  }

  openEdit(employee: Employee) {
    const dialogRef = this.dialog.open(DialogEmployeeComponent, {
      width: this.width,
      data: employee
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getEmployees();
    });
  }

  delete(employee: Employee) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiEmployee.delete(employee.id).subscribe(response => {
          if (response.exito === 1) {
            this.snackBar.open('Employee deleted successfully!', '', {
              duration: 2000
            });
            this.getEmployees();
          }
        });
      }
    });
  }
}
