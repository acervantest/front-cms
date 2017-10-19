import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Chapter } from '../models/chapter.model';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class ChapterService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private _http: Http) { }

    addChapter(chapter: Chapter){
      //let headers = new Headers({ 'Content-Type': 'application/json' });
      return this._http.post('/chapter/register', chapter, { headers: this.headers })
            .map(res => res.json())
            .catch( err => Observable.throw(err.json()));
    }

    modifyChapter(chapter){
      console.log('chapter modified: '+chapter.introduction);
      let headers = new Headers();
      return this._http.patch('/chapter/modify', chapter, { headers: this.headers })
          .map(res => res.json())
          .catch( err => Observable.throw(err.json()));
    }

    loadUpdatedChapters(referenceId){
      return this._http.get('/chapter/chapterById/'+referenceId)
            .map((res) => {
                 return res.json()['obj'];
                })
            .catch( err => Observable.throw(err.json()));
    }

    dropChapter(chapterId){
      return this._http.delete('/chapter/remove/'+chapterId)
      .map(res => res.json())
      .catch( err => Observable.throw(err.json()));
    }

}
