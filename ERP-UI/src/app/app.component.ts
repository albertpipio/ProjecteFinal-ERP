import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { ApiAuthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ERP-UI';
  user!: User;

  constructor(public apiauthService: ApiAuthService,
    private router: Router) {
    this.apiauthService.user.subscribe(res => {
      this.user = res;
      // console.log('changed object: ' + res);
    });
  }

  logout(){
    this.apiauthService.logout();
    this.router.navigate(['/login']);
  }
}
