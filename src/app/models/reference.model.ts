import { Chapter } from '../models/chapter.model';

export class Reference{
    constructor(
        public name: String,
        public description: String,
        public id?: String,
        public chapters?: Chapter[]
    ){}
}
