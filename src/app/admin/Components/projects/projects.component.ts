import { Project } from './../../../models/project';
import { ClientLocationsService } from './../../../services/client-locations.service';
import { Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormControl, NgForm } from '@angular/forms';
import { ProjectsService } from 'src/app/services/projects.service';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { Observable } from 'rxjs';
import { ClientLocation } from 'src/app/models/client-location';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  showNewRow : boolean;
  projects: Project[];

  //clientLocations: ClientLocation[] =[];
  clientLocations: Observable<ClientLocation[]>;
  newProject : Project = new Project();
  editProject : Project = new Project();
  showLoading: boolean =  true;
  editIndex : number;
  controls: FormArray;
  showEditProjectForm: boolean;
  showDeleteProjectForm: boolean;
  deleteProject: Project = new Project();
  deleteIndex:number = null;
  searchBy:string = "ProjectName";
  searchText:string = "";
  selectedClientLocation = ClientLocation;

  isAllChecked: boolean = false;

  @ViewChild("newForm") newForm: NgForm;
  currentPageIndex: number = 0;
  pages:any[] = [];
  pageSize:number = 3;

  //@ViewChild("prj") prj: ProjectComponent; //accessing the child component i.e. project component, using view child only one component or the first componet is accessible
  @ViewChildren("prj") prj: QueryList<ProjectComponent>;
  //@ContentChild("selectionBox") selectionBox: CheckBoxPrinterComponent;
  //@ContentChildren("selectionBox") selectionBox: QueryList<CheckBoxPrinterComponent>;;

  @ViewChild("prjID") prjID: ElementRef;

  constructor(private projectService:ProjectsService, private clientLocationsService: ClientLocationsService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(
      (response:Project[]) => {
        this.projects = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );

    this.clientLocations = this.clientLocationsService.getClientLocations();
    // this.clientLocationsService.getClientLocations().subscribe(
    //   (response: ClientLocation[]) => {
    //     this.clientLocations = response;
    //   }
    // )
  }

  onCreateNewProject(event)
  {

    this.showEditProjectForm = false;
     this.showNewRow = true;

     if(this.newForm != undefined) {
       this.newForm.resetForm();
     }

     setTimeout(() => {
       this.prjID.nativeElement.focus();
     },100);

  }

  onSave(event) {
    if(this.newForm.valid) {
      this.projectService.insertProject(this.newProject).subscribe(
        (response) => {
          this.showNewRow = false;
          this.projects.push(this.newProject);
          this.calculateNoOfPages();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  calculateNoOfPages() {
    let filterPipe = new FilterPipe();
    var resultProjects = filterPipe.transform(this.projects, this.searchBy, this.searchText);
    var noOfPages = Math.ceil(resultProjects.length / this.pageSize);

    this.pages = [];
    for(let i=0; i<noOfPages; i++) {
      this.pages.push({pageIndex : i});
    }
    this.currentPageIndex = 0;
  }

  isAllCheckedChange(event) {
    let proj = this.prj.toArray();
    for(let i=0;i<proj.length;i++) {
        proj[i].isAllCheckedChange(this.isAllChecked);
    }

    //communicationg directly to the grandchild doesnot work
    // let checkBoxComponent = this.selectionBox.toArray();
    // console.log(checkBoxComponent.length);
    // for(let i=0; i<checkBoxComponent.length;i++) {
    //   console.log(checkBoxComponent[i]);
    //   checkBoxComponent[i].toggleCheckFromProjectsComponents();
    // }
  }

  chanageTrack(event)
  {
    this.newProject.clientLocationID = this.newProject.clientLocation.clientLocationID;
     //console.log(this.newProject.clientLocation);
     //console.log(this.newProject.clientLocationID);
  }

  chanageTrackOnEdit(event) {
    this.editProject.clientLocationID = this.editProject.clientLocation.clientLocationID;
  }

  onCancelNewProject(event) {
    this.showNewRow = false;
  }

  onEditClick(event, index: number) {
    console.log(this.editProject);
    console.log(this.projects[index]);

     this.editProject.projectID = this.projects[index].projectID;
     this.editProject.projectName = this.projects[index].projectName;
     this.editProject.dateOfStart = this.projects[index].dateOfStart;
     this.editProject.teamSize = this.projects[index].teamSize;
     this.editProject.active = this.projects[index].active;
     this.editProject.clientLocationID = this.projects[index].clientLocationID;
     this.editProject.clientLocation = this.projects[index].clientLocation;
     this.editProject.status = this.projects[index].status;

     this.editIndex = index;
     this.showEditProjectForm =  true;
     this.showNewRow = false;
     this.showDeleteProjectForm = false;
  }

  onUpdateClick() {
    this.projectService.updateProject(this.editProject).subscribe(
      (response:Project) => {
          var p: Project = new Project();
          p.projectID = response.projectID;
          p.projectName = response.projectName;
          p.dateOfStart = response.dateOfStart;
          p.teamSize = response.teamSize;
          p.clientLocation = response.clientLocation;
          p.active = response.active;
          p.clientLocationID = response.clientLocationID;
          p.status = response.status;
          this.projects[this.editIndex] = p;
      },
      (error) => {
         console.log(console.error);
      }
    )
    this.showEditProjectForm = false;
  }

  OnCancelEditForm() {
    this.showEditProjectForm = false;
  }


  onDeleteClick(event, index) {
    this.showDeleteProjectForm = true;
    this.showEditProjectForm = false;
     this.deleteIndex = index;
     this.deleteProject.projectID = this.projects[index].projectID;
     this.deleteProject.projectName = this.projects[index].projectName;
     this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
     this.deleteProject.teamSize = this.projects[index].teamSize;
  }

  onDeleteConfirmClick() {
    this.showDeleteProjectForm = false;
      this.projectService.deleteProject(this.deleteProject.projectID).subscribe(
        (response) => {
          this.projects.splice(this.deleteIndex,1);
          this.calculateNoOfPages();
        },
        (error) => {
          console.log(error);
        }
      )
  }

  OnCancelDeleteForm() {
    this.showDeleteProjectForm = false;
  }

  onSearchClick() {
    console.log("search by "+this.searchBy);
    this.projectService.searchProjects(this.searchBy, this.searchText).subscribe(
      (response:Project[]) => {
        console.log(response);
        this.projects = response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onSearchTextKeyup(event) {
    this.calculateNoOfPages();
  }

  onHideShowDetails(event)
  {
    this.projectService.toggleDetails();
    // let proj = this.prj.toArray();
    // for(let i=0;i<proj.length; i++) {
    //   proj[i].toggleDetails();
    // }
    //this.prj.toggleDetails();
  }
  onPageIndexClicked(pageIndex: number) {
    this.currentPageIndex = pageIndex; // as soon as the new pageIndex is assigned then because of this the pagining pipe is re-executed, which filter out the content
  }

}
