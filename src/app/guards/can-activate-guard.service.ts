import { LoginService } from './../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(private loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService) { }

  canActivate(route:ActivatedRouteSnapshot): boolean {
    console.log("tracking the user navigation using activatedroutesnapshot:",this.router.url);
    var token = sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")).token : null;
    console.log("role",this.jwtHelperService.decodeToken(token).role);
    if(this.loginService.isAuthenticated() && this.jwtHelperService.decodeToken(token).role != route.data.expectedRole) {
      return true;
    }
    else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
