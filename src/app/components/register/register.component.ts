import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    username: String;
    password: String;
    email:    String;
    
    constructor(
        private _validateService: ValidateService,
        private _flashMessage: FlashMessagesService,
        private _authService: AuthService,
        private _router: Router,
        ) { }

    ngOnInit() {
    }
    
    onRegisterSubmit(){
        
        let newUser: User = new User(this.username, 
                                     this.password, 
                                     this.email);
        
        //REQUIRED FIELDS USER
        if(!this._validateService.validateRegister(newUser)){
            this._flashMessage.show(' Please fill in all fields! ', {
                    cssClass: 'alert-danger',
                    timeout: 5000});
            return false;
        }
        
        //REQUIRED EMAIL
        if(!this._validateService.validateEmail(newUser.email)){
            this._flashMessage.show('Please use a valid email! ', {
                    cssClass: 'alert-danger',
                    timeout: 5000});
            return false;
        }
        
        //REGISTER USER
        this._authService.registerUser(newUser).subscribe( data => {
           if(data.success){
               this._flashMessage.show('You are now registered ', {
                    cssClass: 'alert-primary',
                    timeout: 5000});
               this._router.navigate(['/login']);
           } else {
               this._flashMessage.show('Something went wrong', {
                    cssClass: 'alert-danger',
                    timeout: 5000});
               this._router.navigate(['/register']);
           }
        });
        
    }

}
