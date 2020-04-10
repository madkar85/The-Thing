import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../service/validation.service';
import { Login } from '../model/login';
import { AuthenticationService } from '../service/authentication.service';
import { AuthToken } from '../model/auth-token';
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
  public authToken: AuthToken;

  ngOnInit() {

    this.loginData = new Login();
    this.loginData.socialSecurityNumber = '';
    this.loginData.email = '';
    this.loginData.password = '';


  }

  public login() {

    this.authenticationService.getAuthentication(this.loginData).subscribe((res) => {

      this.authToken = res;

      this.router.navigate(['/menu']);

      console.info(res);
      console.info(this.authToken);

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
