import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenceService } from '../../services/reference.service';
import { Reference } from '../../models/reference.model';
import { Chapter } from '../../models/chapter.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    @ViewChild('createInput') createInput;

    currentReference: Reference;
    allReferences: Reference[];
    newReferenceName: String;
    newReferenceDescription: String;

    constructor(
        private _referenceService: ReferenceService
    ) { }

    ngOnInit() {
        this.allReferences = [];
        this.loadReferences();
    }

    reloadInfo(message){
      this.allReferences = [];
      console.log('reloading info ... '+message);
      if(message === 'reference removed!'){
        console.log('setting current reference to null');
        this.currentReference = null;
      }
      setTimeout(() => this.loadReferences(), 100);
    }

    loadReferences(): void{
      console.log('loadReferences()');
        this._referenceService.getAllReferences()
            .subscribe( (references: any[]) => {

              for(let i = 0; i < references.length; i = i + 1 ){
                var chapterList: any[] = [];
                  /*if(references[i].chapters.length > 0){
                      for(let j = 0; j < references[i].chapters.length; j = j + 1){
                            var currentChapter = {
                              id: references[i].chapters[j]._id,
                              title: references[i].chapters[j].title,
                              introduction: references[i].chapters[j].introduction
                            }
                           chapterList.push(currentChapter);
                      }
                    }*/

                      var newRef = {
                          id: references[i]._id,
                          name: references[i].name,
                          description: references[i].description,
                          chapters: chapterList
                      }

                this.allReferences.push(new Reference(newRef.name, newRef.description, newRef.id, chapterList));
                //chapterList = null;
              }
            //this.allReferences;
        });
    }

    selectReference(reference){
        this.currentReference = reference;
    }

    onCreateNewReference(){
      let newReference = new Reference(this.newReferenceName,
                                       this.newReferenceDescription);

      this._referenceService.addReference(newReference)
          .subscribe(data => {
            if(data.success){
              console.log(data);
            } else {
                console.log('error');
            }
          });
      this.reloadInfo('reference created!');
      this.createInput.nativeElement.click();
    }

}
