import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Animal } from '../model/animal';
import { Observable, BehaviorSubject } from 'rxjs';
import { GenericHttpService } from './generic-http.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalProfileService {

 // private missionAnnouncedSource = new Subject<int>();
// Observable string sources
 // Observable string sources
 private animalIdSource = new BehaviorSubject('');
 // Observable string streams
 currentAnimalId = this.animalIdSource.asObservable();

/* private animalIdSource: BehaviorSubject<number>= new BehaviorSubject<number>(0);
public currentAnimalId: Observable<number> = this.animalIdSource.asObservable(); */

  private baseUrl = 'https://localhost:44365/miraclemile';

  constructor(private genericHttpService: GenericHttpService, private http: HttpClient) { }
  

  private animalsSource: BehaviorSubject<Animal[]> = new BehaviorSubject<Animal[]>([]);
  public currentAnimals: Observable<Animal[]> = this.animalsSource.asObservable();

  
  private allAnimalsSource: BehaviorSubject<Animal[]> = new BehaviorSubject<Animal[]>([]);
  public allCurrentAnimals: Observable<Animal[]> = this.allAnimalsSource.asObservable();

  private animalsTypesSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public currentTypes: Observable<string[]> = this.animalsTypesSource.asObservable();

  private animalsBreedsSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public currentBreeds: Observable<string[]> = this.animalsBreedsSource.asObservable();

  private animalsGendersSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public currentGenders: Observable<string[]> = this.animalsGendersSource.asObservable();

  saveAnimalProfile(animal: Animal): Observable<Animal> {
    const url = `${this.baseUrl}/SaveAnimal`;
    const updatedAnimal = this.genericHttpService.post<Animal>(url, animal);


    // when the result is returned from the server, update any listener to profile$.
    // updatedAnimal.subscribe({
    //   next: (updated) => this.animalSource.next(updated)
    // });
    return updatedAnimal;
    
  }
  // getFiles(filesId:number): Observable<Animal[]> {
  //   //return this.http.get(`${this.baseUrl}/files/${filesId}`);
  // }
  // updateCustomerProfile(user: User): Observable<User> {
  //   const url = environment.update_user_url;
  //   const updatedUser = this.genericHttpService.post<User>(url, user);

  //   // when the result is returned from the server, update any listener to profile$.
  //   updatedUser.subscribe({
  //     next: (updated) => this.userSource.next(updated)
  //   });
  DeleteAnimal(AnimalId: number){

    const url = `${this.baseUrl}/DeleteAnimal`;

    const queryParams =  {AnimalId: AnimalId};

    this.getData<[]>(url, queryParams).subscribe((res) => {

      if (res) {
        this.setAnimals(res);
      }

    });


  }

  /**
   * Get data
   */
   public getData<T>(url: string, QueryParams: object = {}): Observable<any> {

    return this.genericHttpService.get<T>(url, QueryParams);
    
  }

  public setAnimals(Animals: Animal[]) {

    this.animalsSource.next(Animals);

  }


  public getAnimals() {

    return this.animalsSource.value;

  }

  getAnimales(ownerId: number){
 
    const url = `${this.baseUrl}/GetAnimales`;

    const queryParams =  {ownerId: ownerId};

    this.getData<[]>(url, queryParams).subscribe((res) => {

      if (res) {
        this.setAnimals(res);
      }

    });

  }

  getAllAnimales(){

    const url = `${this.baseUrl}/GetAllAnimales`;

    this.getData<[]>(url).subscribe((res) => {

      if (res) {
        this.setallAnimals(res);
      }

    });

  }

  public setallAnimals(Animals: Animal[]) {

    this.allAnimalsSource.next(Animals);

  }


  public getallAnimals() {

    return this.allAnimalsSource.value;

  }

  getAnimalGenders(){

    
    const url = `${this.baseUrl}/getAnimalGenders`;


    this.getData<[]>(url).subscribe((res) => {

      if (res) {
        this.setAnimalsGenders(res);
      }

    });



  }

  public setAnimalsGenders(animalsGenders: string[]) {

    this.animalsGendersSource.next(animalsGenders);

  }


  public getAnimalsGenders() {

    return this.animalsGendersSource.value;

  }

  public existGenders(){
    if(this.animalsBreedsSource.value.length > 0){
      return true;
    }else{
      return false;
    }
  }

  getAnimalBreeds(){

    const url = `${this.baseUrl}/getAnimalBreeds`;


    this.getData<[]>(url).subscribe((res) => {

      if (res) {
        this.setAnimalsBreeds(res);
      }

    });

  }

  
  public setAnimalsBreeds(animalsBreeds: string[]) {

    this.animalsBreedsSource.next(animalsBreeds);

  }


  public getAnimalsBreeds() {

    return this.animalsBreedsSource.value;

  }

  public existBreeds(){
    if(this.animalsBreedsSource.value.length > 0){
      return true;
    }else{
      return false;
    }
  }

  setAnimalId(animalId: string) {
    this.animalIdSource.next(animalId);
  }

  getAnimalTypes(){
  
    const url = `${this.baseUrl}/getAnimalTypes`;


    this.getData<[]>(url).subscribe((res) => {

      if (res) {
        this.setAnimalsTypes(res);
      }

    });
  
  }

  public setAnimalsTypes(animalsTypes: string[]) {

    this.animalsTypesSource.next(animalsTypes);

  }


  public getAnimalsTypes() {

    return this.animalsTypesSource.value;

  }

  public exictTypes(){

    if(this.animalsTypesSource.value.length > 0){
      return true;
    }else{
      return false;
    }

  }
  public existAnimalId(){
    let animalId = '';
    this.currentAnimalId
    if(Number(this.currentAnimalId) == 0){
      return false;
    }else{
      return true;
    }
  }
  
}
