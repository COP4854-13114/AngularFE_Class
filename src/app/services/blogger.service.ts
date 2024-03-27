import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  blogAry:string[]=[];
  AddedBlogEntry:EventEmitter<boolean>= new EventEmitter<boolean>();
  constructor() {
    this.blogAry.push('My first blog entry!');
    this.blogAry.push('My second blog entry!');
    this.blogAry.push('My third blog entry!');
   }

  GetBlogAry():string[]
  {
    return this.blogAry;
  }

  AddBlogEntry(blogEntr:string)
  {
    this.blogAry.unshift(blogEntr);
    this.AddedBlogEntry.emit(true);
  }

}
