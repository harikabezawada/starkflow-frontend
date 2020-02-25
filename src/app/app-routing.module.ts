import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodolistComponent } from './todolist/todolist.component';


const routes: Routes = [{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
},
{
  path:'login',
  component:LoginComponent
},{
  path:'navbar',
  component:NavbarComponent,
  children:[{
    path:'todoList',
    component:TodolistComponent
  }]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
