import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    myForm: FormGroup;

    username: String;
    password: String;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _flashMessage: FlashMessagesService
        ) { }

    ngOnInit() {
        this.myForm = new FormGroup({
           username: new FormControl(null, Validators.required),
           password: new FormControl(null, Validators.required)
        });
    }

    onLoginSubmit(){
        console.log();
        let user = {
            username: this.myForm.controls.username.value,
            password: this.myForm.controls.password.value
        };

        this._authService.authenticateUser(user).subscribe( data => {
            console.log("data.success: "+data);
            if(data.success){
                this._authService.storeUserData(data.token, data.user);
                this._flashMessage.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 3000});
                this._router.navigate(['/dashboard']);
            }else{
                this._flashMessage.show(data.msg, {
                    cssClass: 'alert-danger',
                    timeout: 5000});
                this._router.navigate(['/login']);
            }
        });
    }
}
