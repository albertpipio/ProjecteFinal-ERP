import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/employee';
import { ApiemployeeService } from 'src/app/services/apiemployee.service';


@Component({
    templateUrl: 'dialogemployee.component.html'
})
export class DialogEmployeeComponent {
    public name!: string;
    public surname!: string;
    public email!: string;
    public pastOrders!: string;
    public completedOrders!: string;
    public salary!: number;
    public id!: string;

    constructor(
        public dialogRef: MatDialogRef<DialogEmployeeComponent>,
        public apiEmployee: ApiemployeeService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public employee: Employee
    ) {
        if (this.employee !== null) {
            this.name = employee.name;
            this.surname = employee.surname;
            this.email = employee.email;
            this.pastOrders = employee.pastOrders;
            this.completedOrders = employee.completedOrders;
            this.salary = employee.salary;
        }
    }

    close() {
        this.dialogRef.close();
    }

    editEmployee() {
        const employee: Employee = { name: this.name, id: this.employee.id, surname: this.surname, email: this.email, pastOrders: this.pastOrders, completedOrders: this.completedOrders, salary: this.salary };
        this.apiEmployee.edit(employee).subscribe(response => {
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Employee updated successfully!', '', {
                    duration: 2000
                })
            }
        });
    }

    addEmployee() {
        const employee: Employee = { id: this.id, name: this.name, surname: this.surname, email: this.email, pastOrders: this.pastOrders, completedOrders: this.completedOrders, salary: this.salary };
        this.apiEmployee.add(employee).subscribe(response => {
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Employee added successfully!', '', {
                    duration: 2000
                })
            }
        });
    }
}