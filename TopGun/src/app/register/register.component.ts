import { Component, OnInit } from '@angular/core';
import { Register } from '../model/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private router: Router,) { }

  public registerData: Register;


  ngOnInit() {

    this.registerData = new Register();

    this.registerData.socialSecurityNumber = '';
    this.registerData.email = '';
    this.registerData.password = '';
    this.registerData.agreeMarketing = false;
    this.registerData.receiveNotificationsByMail = false;

  }

 public registerNewUser(): void{

  }

  navigate():void {
    this.router.navigate(['/login']);
  }
  

}
