import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, of } from 'rxjs';
import { UserToken } from '../model/usertoke';
import { UserInfo } from '../model/userinfo';
import { environment } from '../../environments/environment.development';
import { BlogEntry } from '../model/blogentry';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class BloggerService {

 
  blogAry:BlogEntry[]=[];
  currentUserToken:UserToken|null=null;
  UserLoggedIn:EventEmitter<string>= new EventEmitter<string>();
  AddedBlogEntry:EventEmitter<boolean>= new EventEmitter<boolean>();
  currentUserInfo:UserInfo|null=null;
  constructor(private httpClient:HttpClient,private _snackBar: MatSnackBar) {
    /*this.blogAry.push('My first blog entry!');
    this.blogAry.push('My second blog entry!');
    this.blogAry.push('My third blog entry!');*/
    let storedToken = localStorage.getItem('currentUserToken');
    console.log(storedToken);
    if(storedToken)
    {
      this.currentUserToken = JSON.parse(storedToken);
      let decodedToke = jwtDecode(this.currentUserToken!.token) as any;
      this.httpClient.get<UserInfo>(`${environment.BASE_URL}/Users/${decodedToke.UserData.userId}`).subscribe((res)=>{
        this.currentUserInfo = res;
        console.log(res);
        //this.UserLoggedIn.emit(decodedToke.UserData.userId);
      },(err)=>{
        console.log(err);
        this.currentUserToken=null;
        localStorage.removeItem('currentUserToken');
      });

    }
   }

  SetCurrentUserInfo(userInfo:UserInfo)
  {
    this.currentUserInfo = userInfo;
  }
  GetBlogAry():BlogEntry[]
  {
    this.httpClient.get<BlogEntry[]>(`${environment.BASE_URL}/Posts`).subscribe((data:BlogEntry[])=>{
      console.log(data);
      for(let row of data)
      {
        this.blogAry.push(row);
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
      let response = await firstValueFrom(this.httpClient.post(`${environment.BASE_URL}/Users`,userData));
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
      let userInfo = await firstValueFrom(this.httpClient.get<UserInfo>(`${environment.BASE_URL}/Users/${userName}`));
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
      let userData = await firstValueFrom(this.httpClient.get<UserToken>(`${environment.BASE_URL}/Users/${userId}/${pwd}`));
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
    let newBlogEntry = {
      title:'New Blog',
      content:blogEntr,
      headerImage:''
    }
    let headers = new HttpHeaders();
    headers.set('Authorization',`Bearer ${this.currentUserToken?.token}`);
    this.httpClient.post(`${environment.BASE_URL}/Posts`,newBlogEntry).subscribe(data=>{
      console.log(data);
    });
    this.AddedBlogEntry.emit(true);
  }

}
