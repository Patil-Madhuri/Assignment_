import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formInit();
  }
  formInit(){
    this.loginForm = this.formBuilder.group({
      email: ['admin@gmail.com', Validators.compose([Validators.required, Validators.maxLength(50),
        Validators.pattern('^([a-zA-Z0-9][.-]?)+@([a-zA-Z0-9]+[.-]?)*[a-zA-Z0-9][.][a-zA-Z]{2,3}$')])],
        password:['admin', Validators.compose([Validators.required])]
    })
  }

  getErrorMessage(controlName: string, alias: string) {
    const control = this.loginForm.controls[controlName];

    if (control.errors) {
      if (control.errors.required) {
        return alias + ' is required';
      }
      if (control.errors.minlength) {
        return alias + ' should have at least ' + control.errors.minlength.requiredLength + ' characters';
      }
      if (control.errors.pattern) {
        return 'Invalid ' + alias.toLowerCase();
      }
      if (control.errors.maxlength) {
        return alias + ' should not have more than ' + control.errors.maxlength.requiredLength + ' characters';
      }
      if (control.errors.min) {
        return alias + ' should be greater than ' + control.errors.min.min;
      }
      if (control.errors.max) {
        return alias + ' can not be greater than ' + control.errors.max.max;
      }
    }
  }

  login(){
    localStorage.setItem('token', 'qwertyuioasdfghjkxcvbnmsdfghjk123456789')
    this.router.navigate(['home']);
  }
}
