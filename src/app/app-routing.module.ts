import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { NewblogComponent } from './view/newblog/newblog.component';
import { RegisterComponent } from './view/register/register.component';
import { noauthGuard } from './guards/noauth.guard';

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
  canActivate:[noauthGuard],
  component:NewblogComponent
},
{
  path:'register',
  component: RegisterComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
