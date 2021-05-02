import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  // public MyObservable: Observable<boolean>;
  // public MyObservers: Observer<boolean>[] = [];

  // public MySubject : Subject<boolean>;
  public MySubject : BehaviorSubject<boolean>;

  constructor(private httpClient:HttpClient) {
      //  this.MyObservable = new Observable((observer: Observer<boolean>) => {
      //    this.MyObservers.push(observer);
      //  });
      //this.MySubject = new Subject<boolean>();
      this.MySubject = new BehaviorSubject<boolean>(false);
   }

  //  getAllProjects():Observable<Project[]>{
  //    return this.httpClient.get<Project[]>("https://localhost:44316/api/projects", { responseType:  "json"} );
  //  }

  hideDetails:boolean = false;

  toggleDetails() {
    //this.hideDetails = !this.hideDetails;
    // for(let i=0; i< this.MyObservers.length; i++) {
    //   this.MyObservers[i].next(this.hideDetails);
    // }
    //this.MySubject.next(this.hideDetails);
    this.MySubject.next(!this.MySubject.value);
  }

  getAllProjects():Observable<Project[]>{
    // var currentUser = {token:""};
    // var headers = new HttpHeaders();
    // headers = headers.set("Authorization","Bearer");
    // if(sessionStorage.currentUser != null)
    // {
    //   currentUser = JSON.parse(sessionStorage.currentUser);
    //   headers = headers.set("Authorization","Bearer "+ currentUser.token);
    // }

    return this.httpClient.get<Project[]>("https://localhost:44316/api/projects", { responseType:  "json"} )
    .pipe(map(
      (data: Project[]) => {
        for(let i=0; i< data.length;i++) {
          data[i].teamSize = data[i].teamSize*100;
        }
        return data;
      }
    ));
  }

  getProjectByProjectID(projectID: number):Observable<Project> {
    return this.httpClient.get<Project>("https://localhost:44316/api/projects/searchbyprojectid/" + projectID, {responseType:"json"});
  }

   insertProject(newProject: Project):Observable<Project> {
     return this.httpClient.post<Project>("https://localhost:44316/api/projects", newProject, { responseType:  "json"} );
   }

   updateProject(existingProject: Project):Observable<Project> {
     return this.httpClient.put<Project>("https://localhost:44316/api/projects", existingProject, { responseType:  "json"} );
   }

   deleteProject(projectID: number): Observable<string> {
     return this.httpClient.delete<string>("https://localhost:44316/api/projects?ProjectID="+ projectID);
   }

   searchProjects(searchBy:string, searchText: string): Observable<Project[]> {
     return this.httpClient.get<Project[]>("https://localhost:44316/api/projects/search/" + searchBy +"/"+ searchText, {responseType:"json"});
   }
}
