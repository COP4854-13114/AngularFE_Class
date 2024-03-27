import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { NewblogComponent } from './view/newblog/newblog.component';

const routes: Routes = [
{
  path:'',
  component: HomeComponent
},
{
  path:'Login',
  component:LoginComponent
},
{
  path:'newblog',
  component:NewblogComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
