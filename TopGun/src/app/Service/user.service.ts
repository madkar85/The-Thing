import { Injectable } from '@angular/core';
import { Register } from '../model/register';
import { Observable, BehaviorSubject } from 'rxjs';
import { GenericHttpService } from './generic-http.service';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private genericHttpService: GenericHttpService) { }

  private userSource: BehaviorSubject<User> = new BehaviorSubject<User>(User.empty());
  public currentUser: Observable<User> = this.userSource.asObservable();


  /**
   * Addd user to server
   */
  public addUser(registerData: Register): Observable<any> {

    const url = environment.register_url;

    const queryParams =  {model: registerData};

    //return this.genericHttpService.post<Register>(url, queryParams);
    return this.postData<Register>(url, queryParams);
  }

  public getCustomerUserProfile() {

    this.getAuthenticatedUser().subscribe((res) => {

      if (res) {
        this.setUser(res);
      }

    });

  }


  /**
   * Gets user from the server.
   */
  public getAuthenticatedUser(): Observable<User> {

    const url = environment.get_user_url;

    //return this.genericHttpService.post<User>(url);
    return this.postData<User>(url);
  }

  /**
   * A call to update the customer profile with new data. THis method returns an observable, however, the
   * result is also published in the Observable userSource. So if the client already subscribes the new User
   * data by subscribing to userSource, that client will be notified once this operation has succeeded.
   */
  updateCustomerProfile(user: User): any{
    //const url = environment.update_user_url;
    //const updatedUser = this.genericHttpService.post<User>(url, user);

    // when the result is returned from the server, update any listener to profile$.
    /*updatedUser.subscribe({
      next: (updated) => this.userSource.next(updated)
    });*/


    const url = environment.update_user_url;

    const queryParams =  {model: user};

    const updatedUser = this.postData<User>(url, queryParams).subscribe((res) => {

      if (res) {
        this.setUser(res);
      }

    });

    return updatedUser;
  }

 /**
   * post data.
   */
  public postData<T>(url: string, QueryParams: object = {}): Observable<any> {

    return this.genericHttpService.post<T>(url, QueryParams);
    
  }
  /**
   * Set logged in user.
   */
  public setUser(user: User) {

    this.userSource.next(user);

  }

  /**
   * Get current value from Observable without subscribing (just want value one time).
   */
  public getUser() {

    return this.userSource.value;

  }

  public checkUser(){

    if(this.userSource.value){
      return true;
    }else{
      return false;
    }

  }

}
