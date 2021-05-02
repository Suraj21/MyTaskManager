import { CanActivateGuardService } from './../../guards/can-activate-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { ProjectsComponent } from '../Components/projects/projects.component';
import { ProjectDetailsComponent } from '../Components/project-details/project-details.component';
import { MastersComponent } from '../Components/masters/masters.component';

const routes: Routes = [

  //{path:"admin", canActivate:[CanActivateGuardService], data:{expectedRole:"admin"}, children:[
  {path:"", canActivate:[CanActivateGuardService], data:{expectedRole:"admin"}, children:[
    {path:"dashboard", component:DashboardComponent},
    {path:"projects",component:ProjectsComponent},
    {path:"projects/view/:projectid/:location", component:ProjectDetailsComponent},
    {path:"masters", component:MastersComponent},
  ]},

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class AdminRoutingModule { }
