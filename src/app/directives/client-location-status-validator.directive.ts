
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appClientLocationStatusValidator]',
  providers:[{provide:NG_VALIDATORS,
    useExisting:ClientLocationStatusValidatorDirective,
     multi:true}]
})
export class ClientLocationStatusValidatorDirective implements Validators {

  constructor() { }

  validate(control:AbstractControl):ValidationErrors | null {

    let isValid = true;

    //if(control.value.ClientLocation.clientLocationID == 6 && control.value.Status == "Support") {
    if(control.value.Status == "Support") {
      isValid = false;
    }

    if(isValid == true) {
      return null;
    }
    else {
      return {clientLocationStatus: {valid:false}};
    }
  }

}
