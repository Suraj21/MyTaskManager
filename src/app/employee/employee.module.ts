import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
  exports: [
    TasksComponent
  ]
})
export class EmployeeModule { }
