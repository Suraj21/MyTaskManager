import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component: LoginComponent,},
  {path:"signup", component:SignUpComponent, canDeactivate:[CanDeactivateGuardService]},
  {path:"about", component:AboutComponent},
  {path:"admin", loadChildren:() => import("./admin/admin.module").then(m => m.AdminModule)}
  // {path:"admin", canActivate:[CanActivateGuardService], data:{expectedRole:"admin"}, children:[
  //   {path:"dashboard", component:DashboardComponent},
  //   {path:"projects",component:ProjectsComponent},
  //   {path:"projects/view/:projectid/:location", component:ProjectDetailsComponent},
  // ]},

  // {path:"admin", canActivate:[CanActivateGuardService], data:{expectedRole:"employee"}, children:[
  //   {path:"tasks",component:TasksComponent}
  // ]}
];

@NgModule({
  //PreLoadAllModules will load the modules eagerly even if lazy loading configuration is done
  //if we copy paste the url into diff brower tab then also the url will work
  imports: [RouterModule.forRoot(routes, {useHash:true, enableTracing:true, preloadingStrategy: NoPreloading})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
