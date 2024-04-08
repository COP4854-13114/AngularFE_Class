import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username='';
  constructor(private router:Router, private activatedRoute:ActivatedRoute){
    this.activatedRoute.params.subscribe(params=>{
      this.username=params['userId'];
    });
    
  }
}
