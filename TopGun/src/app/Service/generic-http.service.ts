import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  constructor(private httpClient: HttpClient, ) { }

  public post<T>(url: string, item?: T): Observable<T> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    });

    const options = { headers };

    if (item === undefined) {
      return this.httpClient.post<T>(url, options);
    } else {
      return this.httpClient.post<T>(url, item, options);
    }


  }


  get<T>(url: string, params: object = {}): Observable<T> {

    let httQueryParams = this.addParamsToHttp(params);

    return this.httpClient.get<T>(url,{params: httQueryParams});
  }


  addParamsToHttp(paramsList: any): HttpParams{

    let params = new HttpParams();
    console.log('loop param list');
    for (let key in paramsList) {

      params = params.append(key, paramsList[key]);

  }
  
  return params;
  
  }

  /*addParamsToHttp(paramsList: object): HttpParams{

    let params = new HttpParams();

    for (var product of products) {
      console.log(product.product_desc)
 }
    params = params.append('var1', val1);
    params = params.append('var2', val2);

    return params;
  }*/

  delete<T>(url: string, item: T) {
    return this.httpClient.delete(url, item);
  }

}
