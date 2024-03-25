import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  blogAry:string[]=[];
  helloWorld:string='Hello World!';
  constructor(){
    setTimeout(() => {
      this.helloWorld='Good bye World';
    }, 3000);
    this.blogAry.push('My first blog entry!');
    this.blogAry.push('My second blog entry!');
    this.blogAry.push('My third blog entry!');
  }
}
