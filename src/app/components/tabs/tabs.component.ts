import { Component, OnInit , Input, Output, OnChanges, EventEmitter, ViewChild } from '@angular/core';
import { Reference } from '../../models/reference.model';
import { Chapter } from '../../models/chapter.model';
import { ReferenceService } from '../../services/reference.service';
import { ChapterService } from '../../services/chapter.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnChanges {

    @Input() currentReference: Reference;
    //private currentReference: Reference;

    /*getCurrentReference(): Reference{
      return this.currentReference;
    }
    @Input('currentReference')
    set CurrentReference(ref: Reference){
      this.currentReference = ref;
      console.log('current reference @Input invoqued!');
    }*/

    @Output() functionEmitter = new EventEmitter<String>();
    @ViewChild('updateInput') updateInput;
    @ViewChild('createChapterInput') createChapterInput;
    @ViewChild('updateChapterInput') updateChapterInput;

    allChapters: Chapter [] = [];
    allChaptersGrouped: any [] = [];
    updateReferenceName: String;
    updateReferenceDescription: String;
    updateReferenceId: String;

    newChapterTitle: String;
    newChapterIntroduction: String;

    updateChapterId: String;
    updateChapterTitle: String;
    updateChapterIntroduction: String;

    constructor(
      private _referenceService: ReferenceService,
      private _chapterService: ChapterService
    ) {}

    ngOnInit() {
      console.log('ngOnInit()');
    }

    ngOnChanges(){console.log('ngOnChanges()');
        this.clearCache();
    }

    clearCache(){
      console.log('clearCache(), current reference: '+this.currentReference.id);

      this.allChapters = [];

      this.updateReferenceId = this.currentReference.id;
      this.updateReferenceName = this.currentReference.name;
      this.updateReferenceDescription = this.currentReference.description;

      this.newChapterTitle = null;
      this.newChapterIntroduction = null;

      this.loadUpdatedChapters();
    }

    loadGroupedChapters(allChapters){
      this.allChaptersGrouped = [];
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

    onEdit(){
    //    this.functionEmitter.emit('reference edited!');
    }

    onUpdateChapter(chapter: Chapter){
      this.updateChapterId = chapter.id;
      this.updateChapterTitle = chapter.title;
      this.updateChapterIntroduction = chapter.introduction;
    }

    onUpdateChapterModal(){
      this.allChapters = [];
      let updatedChapter = {
        title: this.updateChapterTitle,
        introduction: this.updateChapterIntroduction,
        id: this.updateChapterId
      }

      this._chapterService.modifyChapter(updatedChapter)
         .subscribe(data => {
           if(data.success){
             console.log(data);
           } else {
               console.log('error');
           }
       });

       this.updateChapterInput.nativeElement.click();
       setTimeout(() => this.loadUpdatedChapters(), 100);
    }

    loadUpdatedChapters(){
      console.log('..:: loadUpdatedChapters() ::..'+' current reference id: '+this.currentReference.id);
      var isChaptersEmpty = this.allChapters.length > 0 ? true : false;
      if(!isChaptersEmpty){
        this.allChapters = [];
        this._chapterService.loadUpdatedChapters(this.currentReference.id)
              .subscribe((updatedChapters: any[]) => {
                console.log(updatedChapters);
                  for(let i = 0; i < updatedChapters.length; i = i + 1 ){
                      var updatedChapter = {
                        id: updatedChapters[i]._id,
                        title: updatedChapters[i].title,
                        introduction: updatedChapters[i].introduction
                      }
                      this.allChapters.push(updatedChapter);
                  }
                  this.loadGroupedChapters(this.allChapters);
              });
      }
    }

    //onEmitUpdateChapter(){
    //  this.functionEmitter.emit('chapter edited!');
    //  this.clearCache();
    //}

    onDropReference(){
      this._referenceService.dropReference(this.currentReference)
        .subscribe(data => {
          console.log(data);
        });
      this.functionEmitter.emit('reference removed!');
    }

    onCreateChapter(){
      //this.functionEmitter.emit('chapter created!');
    }

    onCreateChapterModal(){
      let newChapter = {
         title: this.newChapterTitle,
         introduction: this.newChapterIntroduction,
         referenceId: this.currentReference.id
      }

       this._chapterService.addChapter(newChapter)
          .subscribe(data => {
            if(data.success){
              console.log(data);
            } else {
                console.log('error');
            }
        });

        this.currentReference.chapters.push(newChapter);
        this.createChapterInput.nativeElement.click();
        this.clearCache();
    }

    onDropChapter(chapter){
      console.log('droping : '+chapter.title+ ' id: '+chapter.id);
      this._chapterService.dropChapter(chapter.id)
        .subscribe(data => {
          if(data.success){
            console.log(data);
          } else {
              console.log('error');
          }
        });
      this.clearCache();  
    }

}
