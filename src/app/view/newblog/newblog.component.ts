import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrl: './newblog.component.scss'
})
export class NewblogComponent {
  newBlogEntry:string='';
  constructor(private blogSvc:BloggerService, private router:Router)
  {

  }
  //@Input() BlogArray:string[]=[];
  @Output() NewBlogEntry:EventEmitter<string>= new EventEmitter<string>();
  AddBlogEntry()
  {
    //this.blogAry.push(this.newBlogEntry);
    //this.BlogArray.unshift(this.newBlogEntry);
    //alert(this.newBlogEntry);
    /*this.NewBlogEntry.emit(this.newBlogEntry);*/
    
    this.blogSvc.AddBlogEntry(this.newBlogEntry);
    this.newBlogEntry="";
    this.router.navigate(['/']);
  }
}
