import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  constructor(private httpClient: HttpClient, ) { }

  /*public post<T>(url: string, item?: T): Observable<T> {

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


  }*/

  
  post<T>(url: string, params: object = {}): Observable<T> {

    let httQueryParams: object;
    if(this.checkIfParams(params))
    {
    httQueryParams = this.addParamsToHttp(params);
  }else{
    httQueryParams = this.getModel(params);
  }

    return this.httpClient.post<T>(url,httQueryParams);
  }


  get<T>(url: string, params: object = {}): Observable<T> {

    let httQueryParams: object;
    if(this.checkIfParams(params))
    {
    httQueryParams = this.addParamsToHttp(params);
  }else{
    httQueryParams = this.getModel(params);
  }

    return this.httpClient.get<T>(url,httQueryParams);
  }


  addParamsToHttp(paramsList: any): object{

    let params = new HttpParams();
    
    for (let key in paramsList) {

      params = params.append(key, paramsList[key]);

  }

  const httQueryParams = {params: params};

  return httQueryParams;
  
  }

  checkIfParams(paramsList: any){

    for (let key in paramsList) {

      if(key === 'model'){
return false;
      }

  }

  return true;

  }

  getModel(paramsList: any){

    for (let key in paramsList) {

      if(key === 'model'){
      return paramsList[key];
      }

  }
console.info("error no model in param");
  return null;

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
