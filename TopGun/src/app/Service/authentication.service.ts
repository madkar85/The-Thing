import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthToken } from '../model/auth-token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  public getAuthentication(logindata: Login): Observable<AuthToken> {
    console.info(logindata);
    const url = environment.authenticate_url;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    });

    const options = { headers };

    return this.httpClient.post<any>(url, logindata , options);
  }

  public parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
