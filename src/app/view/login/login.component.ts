import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BloggerService } from '../../services/blogger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username='';
  password='';
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private blogerSvc:BloggerService){
    this.activatedRoute.params.subscribe(params=>{
      this.username=params['userId'];
    });
    
  }

 async LoginUser()
  {
    if(this.username!=='' && this.password !=='')
    {
      let userData = await this.blogerSvc.LoginUser(this.username,this.password);
      if(userData)
      {
        console.log(userData);
        alert('Login successful! Redirecting to home page...');
      }
    }
    else
    {
      alert('Please enter a username and password!');
    }
  }
}
