import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Reference } from '../models/reference.model';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class ReferenceService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http: Http) { }

    getAllReferences(){
      return this._http.get('/reference/allReferences')
                 .map((res) => {
                      return res.json()['obj'];
                    })
    }

    updateReference(reference){
      let headers = new Headers();
      return this._http.post('/reference/modify', reference, { headers: this.headers })
          .map(res => res.json())
          .catch( err => Observable.throw(err.json()));
    }

    addReference(reference){
      let headers = new Headers();
      return this._http.post('/reference/register', reference, { headers: this.headers })
            .map(res => res.json())
            .catch( err => Observable.throw(err.json()));
    }

    dropReference(reference){
      return this._http.delete('/reference/drop/'+reference.id)
            .map(res => res.json())
            .catch( err => Observable.throw(err.json()));
    }

}
