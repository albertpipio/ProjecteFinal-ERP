import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogClientComponent } from './client/dialog/dialogclient.component';
import { DialogDeleteComponent } from './common/delete/dialogdelete.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { DialogWarehouseComponent } from './warehouse/dialog/dialogwarehouse.component';
import { EmployeeComponent } from './employee/employee.component';
import { DialogEmployeeComponent } from './employee/dialog/dialogemployee.component';
import { OrderComponent } from './order/order.component';
import { DialogOrderComponent } from './order/dialog/dialogorder.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BubbleChartComponent } from './charts/bubble-chart/bubble-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientComponent,
    DialogClientComponent,
    DialogDeleteComponent,
    LoginComponent,
    WarehouseComponent,
    DialogWarehouseComponent,
    EmployeeComponent,
    DialogEmployeeComponent,
    OrderComponent,
    DialogOrderComponent,
    BarChartComponent,
    LineChartComponent,
    BubbleChartComponent,
    PieChartComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
