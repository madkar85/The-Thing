import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthToken } from '../model/auth-token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
import { GenericHttpService } from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private genericHttpService: GenericHttpService) { }

  private tokenName = 'jwt_token';


  getToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded = this.parseJwt(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string | null): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date!.valueOf() > new Date().valueOf());

  }



  public getAuthentication(logindata: Login): Observable<AuthToken> {
    console.info(logindata);

    const url = environment.authenticate_url;

    return this.genericHttpService.post<any>(url, logindata);
  }

  public parseJwt(token: any) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    

    return JSON.parse(jsonPayload);
  }
}
