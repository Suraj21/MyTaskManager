import { EmployeeModule } from './employee/employee.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtUnAuthorizedInterceptorService } from './interceptors/jwt-un-authorized-interceptor.service';
// import { AdminModule } from './admin/admin.module'; //admin module is no lazy loaded through routes load children
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AlertDirective } from './directives/alert.directive';
import { RepeaterDirective } from './directives/repeater.directive';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    AlertDirective,
    RepeaterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    EmployeeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:() => {
          return (sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")).token: null)
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:JwtInterceptorService,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:JwtUnAuthorizedInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
