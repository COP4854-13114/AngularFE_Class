import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogEntry } from '../../model/blogentry';
import { UserInfo } from '../../model/userinfo';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  blogAry:BlogEntry[]=[];
  currentUserInfo:UserInfo|null=null;
  constructor(private bloggerSvc:BloggerService){

        
  }
  ngOnDestroy(): void {
    console.log('From On Destroy');
  }
  ngOnInit(): void {
    this.blogAry = this.bloggerSvc.GetBlogAry();
    this.currentUserInfo = this.bloggerSvc.currentUserInfo;
  }
  AddNewEntry(newBlog:string)
  {
    //this.blogAry.unshift(newBlog);
  }
  
}
