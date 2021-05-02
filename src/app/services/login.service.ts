import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginViewModel } from '../models/login-view-model';
import { SignUpViewModel } from '../models/sign-up-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient: HttpClient;
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpBackend: HttpBackend,  private jwtHelperService: JwtHelperService) {

  }

  currentUserName:string = null;
  currentUserRole: string = null;

  public Login(loginViewModel: LoginViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
     return this.httpClient.post<any>("https://localhost:44316/api/account/Authenticate", loginViewModel, { responseType: "json", observe: "response" })
     .pipe(map(user => {
       if(user)
       {

         this.currentUserName = user.body.userName;
         this.currentUserRole = user.body.role;
         sessionStorage.currentUser = JSON.stringify(user.body);
       }
       return user;
     }));
  }

  public Register(signUpViewModel: SignUpViewModel): Observable<any> {
    this.httpClient = new HttpClient(this.httpBackend);
     return this.httpClient.post<any>("https://localhost:44316/api/account/register", signUpViewModel, { responseType: "json", observe: "response" })
     .pipe(map(response => {
       if(response)
       {
         this.currentUserName = response.body.userName;
         sessionStorage.currentUser = JSON.stringify(response.body);
       }
       return response;
     }));
  }

  public getUserByEmail(email: string):Observable<string> {
    this.httpClient = new HttpClient(this.httpBackend);
    return this.httpClient.get<any>("https://localhost:44316/api/account/getUserByEmail/"+ email, {responseType:"json"});
  }


  public Logout()
  {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = null;
  }

  public isAuthenticated() : boolean {
    var token  = sessionStorage.getItem("currentUser")? JSON.parse(sessionStorage.getItem("currentUser")).token: null;
    if(this.jwtHelperService.isTokenExpired()) {
      return false;
    }
    else {
      return true;
    }
  }
}
