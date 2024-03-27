import { Component, OnInit } from '@angular/core';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  blogCount=0;
  constructor(private blogSvc:BloggerService){

  }
  ngOnInit(): void {
    this.blogCount = this.blogSvc.GetBlogAry().length;
    this.blogSvc.AddedBlogEntry.subscribe((em:boolean)=>{
      this.blogCount++;
    });
  }
}
