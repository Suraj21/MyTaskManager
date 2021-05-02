import { LoginViewModel } from './../../models/login-view-model';
import { LoginService } from './../../services/login.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,AfterViewInit {

  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = "";

  @ViewChild("userName") loginUserName: ElementRef;
  constructor(private loginService: LoginService, private router:Router) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit()
  {
    console.log(this.loginUserName);
    if(this.loginUserName != undefined) {
      setTimeout(() => {
        this.loginUserName.nativeElement.focus();
      },1000);
    }
  }

  onLoginClick(event) {
    // this.loginService.Login(this.loginViewModel).subscribe(
    //   (response) => {
    //     //console.log("response ",response);
    //     //this.router.navigateByUrl("/dashboard")
    //     this.router.navigate(["/admin","dashboard"]);
    //   },
    //   (error) => {
    //     this.loginError = "Invalid Username or password";
    //   }
    // )

    this.loginService.Login(this.loginViewModel).subscribe(
      (response) =>
      {
        if (this.loginService.currentUserRole.toLowerCase() == "admin")
        {
          this.router.navigate(["/admin", "dashboard"]);
        }
        else
        {
          this.router.navigate(["/employee", "tasks"]);
        }
      },
      (error) =>
      {
        console.log(error);
        this.loginError = "Invalid Username or Password";
      },
    );

  }

}
