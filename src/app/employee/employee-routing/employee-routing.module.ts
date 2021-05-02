import { CanActivateGuardService } from './../../guards/can-activate-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from '../components/tasks/tasks.component';

const routes: Routes = [
  // {path:"", redirectTo:"login", pathMatch:"full"},
  // {path:"login", component: LoginComponent,},
  // {path:"signup", component:SignUpComponent},
  // {path:"about", component:AboutComponent},

  // {path:"admin", canActivate:[CanActivateGuardService], data:{expectedRole:"admin"}, children:[
  //   {path:"dashboard", component:DashboardComponent},
  //   {path:"projects",component:ProjectsComponent},
  //   {path:"projects/view/:projectid/:location", component:ProjectDetailsComponent},
  // ]},

  {path:"employee", canActivate:[CanActivateGuardService], data:{expectedRole:"employee"}, children:[
    {path:"tasks",component:TasksComponent}
  ]}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,{useHash:true})], //if we copy paste the url into diff brower tab then also the url will work
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
