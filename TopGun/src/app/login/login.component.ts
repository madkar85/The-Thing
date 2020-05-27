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
  public path = '';
  public showMessage: boolean;

  ngOnInit() {

    this.loginData = new Login();
    this.loginData.socialSecurityNumber = '';
    this.loginData.email = '';
    this.loginData.password = '';


  }

  public login(): void {

    this.authenticationService.getAuthentication(this.loginData).subscribe((res) => {

      this.token = res;

      if (!this.checkIfTokenEmpty()) {
        this.authenticationService.setToken(this.token.authToken);

        console.info('-----login-----');
        console.info(res);
        console.info(this.token);

        this.router.navigate(['/mainView']);

      
      }

    });

  }

  public checkIfTokenEmpty(): boolean {
    if (this.token.authToken === '') {
      this.message(true);
      return true;
     
    } else {
      this.message(false);
      return false;
    }

  }

  public message(show: boolean) {

    if (show) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }

  }


  public navigate(): void {
    this.router.navigate(['/register']);
  }

}
