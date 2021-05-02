import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../app/services/login.service';
import { RouterLoggerService } from './services/router-logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(public loginService: LoginService, private routerLoggerService: RouterLoggerService, private router: Router){

  }

  ngOnInit(): void {
    this.router.events.subscribe((event) =>{
        if(event instanceof NavigationEnd) {
            let userNmae = (this.loginService.currentUserName)?
            this.loginService.currentUserName:"anonymous";

            let logMsg = new Date().toLocaleString() + ": " + userNmae + " navigate to" + event.url;

            this.routerLoggerService.log(logMsg).subscribe();
        }
    });
  }


  logOut() {
    this.loginService.Logout();
  }

}
