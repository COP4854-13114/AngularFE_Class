import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

 
  blogAry:string[]=[];
  AddedBlogEntry:EventEmitter<boolean>= new EventEmitter<boolean>();
  constructor(private httpClient:HttpClient) {
    /*this.blogAry.push('My first blog entry!');
    this.blogAry.push('My second blog entry!');
    this.blogAry.push('My third blog entry!');*/
   }

  GetBlogAry():string[]
  {
    this.httpClient.get('https://wfa3.josecgomez.dev/Posts').subscribe((data:any)=>{
      //console.log(data);
      for(let row of data)
      {
        this.blogAry.push(row.content);
      }
    });
    return this.blogAry;
  }

  AddBlogEntry(blogEntr:string)
  {
    this.blogAry.unshift(blogEntr);
    this.AddedBlogEntry.emit(true);
  }

}
