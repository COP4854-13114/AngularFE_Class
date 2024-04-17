import { Component, OnInit } from '@angular/core';
import { BloggerService } from '../../services/blogger.service';
import { UserInfo } from '../../model/userinfo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  blogCount=0;
  currentUserInfo:UserInfo|null=null;
  constructor(private blogSvc:BloggerService){

  }
  ngOnInit(): void {
    this.blogCount = this.blogSvc.GetBlogAry().length;
    this.blogSvc.AddedBlogEntry.subscribe((em:boolean)=>{
      this.blogCount++;
    });
    this.blogSvc.UserLoggedIn.subscribe((userId:string)=>{
      this.blogSvc.GetUserInfo(userId).then((data:UserInfo|null)=>{
        this.currentUserInfo = data;
        if(data)
          this.blogSvc.SetCurrentUserInfo(data);
      });
    });
  }
}
