import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAuthService } from "../services/apiauth.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

    // public loginForm = new FormGroup({
    //     email: new FormControl(''),
    //     password: new FormControl('')
    // });
    public loginForm = this.formBuilder.group({
        email:['', Validators.required],
        password:['', Validators.required]
    });
    // public email: string;
    // public password: string;
    constructor(public apiauthService: ApiAuthService,
        private router: Router,
        private formBuilder: FormBuilder) {
        if (this.apiauthService.userData) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {

    }

    login() {
        console.log(this.loginForm.value);
        this.apiauthService.login(this.loginForm.value).subscribe(response => {
            if (response.exito === 1) {
                this.router.navigate(['/']);
            }
        });
    }
}