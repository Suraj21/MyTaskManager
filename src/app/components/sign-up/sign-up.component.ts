import { SignUpViewModel } from './../../models/sign-up-view-model';
import { CustomValidatorsService } from './../../services/custom-validators.service';
import { CountriesService } from './../../services/countries.service';
import { Country } from './../../models/country';
import { CanComponentDeactivate } from './../../guards/can-deactivate-guard.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, CanComponentDeactivate {

  signUpForm: FormGroup;
  genders = ["male", "female", "do not wish to disclose"];
  countries: Country[] =[];
  registerError: any;
  canLeave:boolean = true;

  constructor(private countriesService: CountriesService,
     private formBuilder: FormBuilder,
     private customValidatorService: CustomValidatorsService,
     private loginService: LoginService,
     private router: Router) { }

  ngOnInit(): void {

    this.countriesService.getCountries().subscribe(
      (response) =>{
        this.countries = response;
      }
    );


    // this.signUpForm = new FormGroup({
    //   personName: new FormGroup({
    //     firstName: new FormControl(null),
    //     lastName: new FormControl(null),
    //   }),

    //   email: new FormControl(null),
    //   mobile: new FormControl(null),
    //   dateOfBirth: new FormControl(null),
    //   gender: new FormControl(null),
    //   countryID: new FormControl(null),
    //   receiveNewsLetters: new FormControl(null),
    //   skills: new FormArray([])
    // });


    // this.signUpForm = this.formBuilder.group({
    //   personName: this.formBuilder.group({
    //     firstName: this.formBuilder.control(null),--using this.formBuilder.control is optional, we can directly assign the value to the field that we are creating
    //     lastName: null/string/number/date/or any value,
    //   }),

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null,[Validators.required, Validators.minLength(2)]],
        lastName: [null,[Validators.required, Validators.minLength(2)]]
      }),

      email: [null,[Validators.required, Validators.email],
                   [this.customValidatorService.DuplicateValidator()],
                   {updateOn:'Blur'}],
      mobile: [null,[Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth: [null,[Validators.required, this.customValidatorService.minimumAgeValidator(18)]],
      password:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]],
      gender: [null,[Validators.required]],
      countryID: [null,[Validators.required]],
      receiveNewsLetters: [null,[Validators.required]],
      skills: this.formBuilder.array([])
    },
     {
      validators:[
        this.customValidatorService.compareValidator("confirmPassword","password")
      ]
     });

    this.signUpForm.valueChanges.subscribe((value) => {
      //console.log(value);
      this.canLeave = false;
    });
  }

  onSubmitClick() {
    //this.signUpForm["submitted"] = true;
    this.signUpForm['submitted'] = true;
    console.log(this.signUpForm.value);
    if(this.signUpForm.valid) {
      var signUpViewModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpViewModel).subscribe(
        (response)=>{
          this.canLeave = true;
          this.router.navigate(["/employee","tasks"]);
        },
        (error) =>{
           console.log(error);
           this.registerError = "Unable to submit";
        }
      );
    }
    else{
      console.log("form invalid");
    }
  }

  onResetClick() {
    this.signUpForm.reset();
  }

  onPreFillReset() {

    this.signUpForm.reset({
      firstName: "Sachidanand",
      lastName: "Suraj",
      email:"suraj.thepions@gmail.com",
      mobile:"9566295774"
    });
  }

  onSetClick(){

    this.signUpForm.setValue({
      firstName: "Sachidanand",
      lastName: "Suraj",
      email: "suraj.thepions@gmail.com",
      mobile: "9566295774",
      dateOfBirth: "05/09/1991",
      gender: "male",
      countryID: 3,
      receiveNewsLetters: true
    })
  }

  //works like updating the field
  onPatchClick() {

    this.signUpForm.patchValue({
      firstName: "Sachidanand",
      lastName: "Suraj",
      email:"suraj.thepions@gmail.com",
      mobile:"9566295774"
    })
  }

  onAddSkills() {
    var formGroup = new FormGroup({
        skillName: new FormControl(null),
        skillLevel:new FormControl(null)
    });

    (<FormArray>this.signUpForm.get("skills"))
    .push(formGroup);
  }

  onRemoveClick(index: number) {
    (<FormArray>this.signUpForm.get("skills"))
    .removeAt(index);
  }
}
