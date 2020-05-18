import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../service/validation.service';
import { Login } from '../model/login';

import { AuthToken } from '../model/auth-token';

import { AuthenticationService } from '../Service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private validationService: ValidationService,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  public loginData: Login;
  public token: AuthToken;

  ngOnInit() {

    this.loginData = new Login();
    this.loginData.socialSecurityNumber = '';
    this.loginData.email = '';
    this.loginData.password = '';


  }

  public login() {

    this.authenticationService.getAuthentication(this.loginData).subscribe((res) => {

      this.token = res;

      this.authenticationService.setToken(this.token.authToken);

      this.router.navigate(['/mainView']);

      console.info(res);
      console.info(this.token);

    });

    /*if (!this.validationService.isValidSwedishSSN(this.loginData.socialSecurityNumber)) {
      //Du har angivit ett ogiltigt personnummer!
      return;
    }else{
      
      this.authenticationService.getAuthentication(this.loginData).subscribe((res) => {
  
        this.authToken = res;
        console.info(res);
        console.info(this.authToken);

      });

    }*/

  }

}
