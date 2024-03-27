import { Component, OnDestroy, OnInit } from '@angular/core';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  blogAry:string[]=[];

  constructor(private bloggerSvc:BloggerService){

        
  }
  ngOnDestroy(): void {
    console.log('From On Destroy');
  }
  ngOnInit(): void {
    this.blogAry = this.bloggerSvc.GetBlogAry();
  }
  AddNewEntry(newBlog:string)
  {
    this.blogAry.unshift(newBlog);
  }
  
}
