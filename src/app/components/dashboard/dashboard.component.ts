import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../services/reference.service';
import { Reference } from '../../models/reference.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    currentReference: Reference;
    allReferences: Reference[];

    constructor(
        private _referenceService: ReferenceService
    ) { }

    ngOnInit() {
      console.log(this.currentReference);
        this.allReferences = [];
        this.loadReferences();
    }

    reloadInfo(){
      console.log("some edition done!!!");
      this.allReferences = [];
      setTimeout(() => this.loadReferences(), 100)
    }

    loadReferences(): void{
        this._referenceService.getAllReferences()
            .subscribe( (references: any[]) => {
              for(let i = 0; i < references.length; i = i + 1 ){
                console.log(references[i].name);
                let newRef = {
                  id: references[i]._id,
                  name: references[i].name,
                  description: references[i].description,
                  chapters: references[i].chapters
                }
                this.allReferences.push(new Reference(newRef.name, newRef.description, newRef.id, newRef.chapters));
              }

            this.allReferences;
        });
    }

    selectReference(reference){
        this.currentReference = reference;
    }

}
