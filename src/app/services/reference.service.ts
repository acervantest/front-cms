import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Reference } from '../models/reference.model';

import 'rxjs/add/operator/map';

@Injectable()
export class ReferenceService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http: Http) { }

    getAllReferences(){
      return this._http.get('/reference/allReferences')
                 .map((res) => {
                      return res.json()['references'];
                    })
    }

    updateReference(reference){
      let headers = new Headers();
      return this._http.post('/reference/modify', reference, { headers: this.headers })
          .map(res => res.json());
    }
}
