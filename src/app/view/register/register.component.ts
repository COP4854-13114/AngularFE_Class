import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BloggerService } from '../../services/blogger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private bloggerSvc:BloggerService, private router:Router){
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFormControl = new FormControl('', [Validators.required]);
  fnameFomrControl = new FormControl('', [Validators.required]);
  lnameFormControl = new FormControl('', [Validators.required]);
  pwdFormControl = new FormControl('', [Validators.required]);
  errorMessage:string = '';
  async RegisterUser()
  {
    if(!this.emailFormControl.invalid && !this.userFormControl.invalid && !this.fnameFomrControl.invalid && !this.lnameFormControl.invalid && !this.pwdFormControl.invalid)
    {
      let result = await this.bloggerSvc.CreateUser(this.userFormControl.value as string, this.emailFormControl.value as string, this.fnameFomrControl.value as string, this.lnameFormControl.value as string, this.pwdFormControl.value as string)
      if(result)
      {
        this.errorMessage='User created!';
        this.router.navigate(['/Login',{userId:this.userFormControl.value}]);
      }
      else
      {
        this.errorMessage='User creation failed!';
      }
    }
    else
    {
      this.errorMessage='Please fill out all fields!';
    }
    
  }
}
