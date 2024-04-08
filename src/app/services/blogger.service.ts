import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

 
  blogAry:string[]=[];
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

  AddBlogEntry(blogEntr:string)
  {
    this.blogAry.unshift(blogEntr);
    this.AddedBlogEntry.emit(true);
  }

}
