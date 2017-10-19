import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

    authToken: any;
    user: any;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http: Http) { }

    registerUser(user){
        let headers = new Headers();
        return this._http.post('/user/register', user, { headers: this.headers })
            .map(res => res.json())
            .catch( err => Observable.throw(err.json()));
    }

    authenticateUser(user){
        let headers = new Headers();
        return this._http.post('/user/authenticate', user, { headers: this.headers })
            .map(res => res.json())
            .catch( err => Observable.throw(err.json()));
    }

    getProfile(){
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this._http.get('/user/profile', {headers: headers})
            .map(res => res.json());
    }

    loadToken(){
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    storeUserData(token, user){
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    logout(){
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

    loggedIn(){
        //console.log("token invoqued: "+tokenNotExpired());
        return tokenNotExpired('id_token');
    }
}
