import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor(private loginService: LoginService) { }

  public minimumAgeValidator(minAge:number):ValidatorFn
  {
     return (control:AbstractControl) : ValidationErrors | null => {
       if(!control.value) {
            return null;
       }
       var today = new Date();
       var dateOfBirth = new Date(control.value);
       var diffMilliSeconds = Math.abs(today.getTime() - dateOfBirth.getTime());
       var diffYears = (diffMilliSeconds / (1000 * 60 * 60 *24))/365.25;

       if(diffYears >= minAge)
        return null;
       else
        return {minAgeInvalid:{valid:false}};
     }
  }

  public compareValidator(controlToValidate: string, controlToCompare: string)
  {
    return (formGroup: FormGroup): ValidationErrors | null => {
      if(!formGroup.get(controlToValidate).value)
        return null; // return if the confirm password is null

      if(formGroup.get(controlToValidate).value == formGroup.get(controlToCompare).value)
        return null;
      else
      {
        formGroup.get(controlToValidate).setErrors({ compareValidator: { valid: false } });
        return { compareValidator: { valid: false } }; //invalid
      }
    }
    // return (formGroup: FormGroup) => {
    //   const control = formGroup.controls[controlToCompare];
    //   const matchingControl = formGroup.controls[controlToValidate];

    //   if (matchingControl.errors && !matchingControl.errors.mustMatch) {
    //       // return if another validator has already found an error on the matchingControl
    //       return;
    //   }

    //   // set error on matchingControl if validation fails
    //   if (control.value !== matchingControl.value) {
    //       matchingControl.setErrors({ compareValidator: true });
    //   }
    //   else {
    //       matchingControl.setErrors(null);
    //   }
    //}
  }

  public DuplicateValidator(): AsyncValidatorFn{

    return(control:AbstractControl): Observable<ValidationErrors | null> => {
        return this.loginService.getUserByEmail(control.value).pipe(map((existingUser: any) =>{
            if(existingUser != null) {
              //control.setErrors({uniqueEmail:{valid:false}});
              return { uniqueEmail: {valid:false} };
            }
            else {
              return null;
            }
          }));1
      }
  }
}
