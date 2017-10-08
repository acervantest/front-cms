import { Component, OnInit , Input, Output, OnChanges, EventEmitter, ViewChild } from '@angular/core';
import { Reference } from '../../models/reference.model';
import { Chapter } from '../../models/chapter.model';
import { ReferenceService } from '../../services/reference.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnChanges {

    @Input() currentReference: Reference;
    @Output() editClicked = new EventEmitter<String>();
    @ViewChild('updateInput') updateInput;

    allChapters: Chapter [] = [];
    allChaptersGrouped: any [] = [];
    updateReferenceName: String;
    updateReferenceDescription: String;
    updateReferenceId: String;

    constructor(
      private _referenceService: ReferenceService
    ) {}

    ngOnInit() {
        this.clearCache();
    }

    ngOnChanges(){
        this.clearCache();
    }

    onEdit(){
        this.editClicked.emit('reference edited!');
    }

    clearCache(){
      this.allChaptersGrouped = [];
      this.updateReferenceId = this.currentReference.id;
      this.updateReferenceName = this.currentReference.name;
      this.updateReferenceDescription = this.currentReference.description;
      this.loadChapters(this.currentReference.chapters);
    }

    loadChapters(allChapters){
        this.allChapters = allChapters;
        for(let i = 0; i < this.allChapters.length; i = i + 3 ){
            let group = this.allChapters.slice(i, i + 3);
            this.allChaptersGrouped.push(group);
        }
    }

    onUpdateReference(){
      this.updateReferenceId = this.currentReference.id;
      this.updateReferenceName = this.currentReference.name;
      this.updateReferenceDescription = this.currentReference.description;
    }

    onUpdateReferenceModal(){
      let referenceModified = new Reference(this.updateReferenceName,
                                            this.updateReferenceDescription,
                                            this.updateReferenceId);
       this._referenceService.updateReference(referenceModified)
        .subscribe(data => {
            console.log(data);
       });

       this.currentReference = referenceModified;

       this.updateInput.nativeElement.click();
    }

}
