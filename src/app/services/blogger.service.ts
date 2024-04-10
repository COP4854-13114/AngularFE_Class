import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, of } from 'rxjs';
import { UserToken } from '../model/usertoke';
import { UserInfo } from '../model/userinfo';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

 
  blogAry:string[]=[];
  currentUserToken:UserToken|null=null;
  UserLoggedIn:EventEmitter<string>= new EventEmitter<string>();
  AddedBlogEntry:EventEmitter<boolean>= new EventEmitter<boolean>();
  constructor(private httpClient:HttpClient,private _snackBar: MatSnackBar) {
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

  async CreateUser(userId:string, emailAddress:string, fName:string, lname:string, pwd:string)
  {
    let userData = {
      userId :userId,
      firstName:fName,
      lastName: lname,
      emailAddress: emailAddress,
      password: pwd
    };

    try
    {
      let response = await firstValueFrom(this.httpClient.post('https://wfa3.josecgomez.dev/Users',userData));
      console.log('hello world!');
      console.log(response);
      this._snackBar.open('User created!','Close');
      return true;
    }
    catch(err:any)
    {
      console.log(err);
      this._snackBar.open(`User creation failed! Error: ${err.error.status}- ${err.error.message}`,'Close',{verticalPosition:'top'});
      return false
    }
  }

  async GetUserInfo(userName:string)
  {
    try
    {
      //let userInfo = await firstValueFrom(this.httpClient.get<UserInfo>(`https://wfa3.josecgomez.dev/Users/${userName}`,{headers:{'Authorization':`Bearer ${this.currentUserToken?.token}`}}));
      let userInfo = await firstValueFrom(this.httpClient.get<UserInfo>(`https://wfa3.josecgomez.dev/Users/${userName}`));
      return userInfo;
    }
    catch(err:any)
    {
      this._snackBar.open(`There was an error getting user information: ${err.error.status}- ${err.error.message}`,'Close',{verticalPosition:'top'});
      return firstValueFrom(of(null));
    }
  }
  async LoginUser(userId:string, pwd:string)
  {
    try
    {
      let userData = await firstValueFrom(this.httpClient.get<UserToken>(`https://wfa3.josecgomez.dev/Users/${userId}/${pwd}`));
      this.currentUserToken = userData;
      localStorage.setItem('currentUserToken',JSON.stringify(userData));
      this.UserLoggedIn.emit(userId);
      return userData;
    }
    catch(err:any)
    {
    
      this._snackBar.open(`Login failed! Error: ${err.error.status}- ${err.error.message}`,'Close',{verticalPosition:'top'});
      return firstValueFrom(of(null));
    
    }
  }

  AddBlogEntry(blogEntr:string)
  {
    this.blogAry.unshift(blogEntr);
    this.AddedBlogEntry.emit(true);
  }

}
