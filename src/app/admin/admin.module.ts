import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { ProjectsComponent } from './Components/projects/projects.component';
import { ProjectComponent } from './Components/project/project.component';
import { CheckBoxPrinterComponent } from './Components/check-box-printer/check-box-printer.component';
import { ProjectDetailsComponent } from './Components/project-details/project-details.component';
import { DashboardService } from '../services/dashboard.service';
import { SharedModule } from '../shared/shared.module';
import { CountriesComponent } from './Components/countries/countries.component';
import { ClientLocationsComponent } from './Components/client-locations/client-locations.component';
import { TaskPrioritiesComponent } from './Components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from './Components/task-status/task-status.component';
import { MastersComponent } from './Components/masters/masters.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
    CountriesComponent,
    ClientLocationsComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent,
    MastersComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    AdminRoutingModule
  ],
  exports: [
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent
  ],
  providers:[DashboardService],
  entryComponents: [
    CountriesComponent,
    ClientLocationsComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent
]

})
export class AdminModule { }
