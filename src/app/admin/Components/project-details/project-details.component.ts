import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from './../../../models/project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;
  routeParamsSubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectsService) {
    this.project = new Project();
   }

  ngOnInit(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      (params)=>{
          let pid = params["projectid"];
          let location = params["location"];
          console.log("location params: ",location);
          this.projectService.getProjectByProjectID(pid).subscribe(
            (response:Project) =>{
              this.project = response;
            }
          );
      }
    );
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }

}
