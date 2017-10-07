import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService, FlashMessagesService]
})
export class NavbarComponent implements OnInit {

    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _flashMessage: FlashMessagesService
    ) { }

    ngOnInit() {
    }

    onLogoutClick(){
        this._authService.logout();
        this._flashMessage.show('You are logged out!', {
            cssClass: 'alert-success',
            timeout: 3000});
        this._router.navigate(['/login']);
        return false;
    }
}
