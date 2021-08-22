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

  private animalsTypes: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public currentTypes: Observable<string[]> = this.animalsTypes.asObservable();

  private animalsBreeds: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public currentBreeds: Observable<string[]> = this.animalsBreeds.asObservable();

  private animalsGenders: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public currentGenders: Observable<string[]> = this.animalsGenders.asObservable();

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
    const url = `${this.baseUrl}/DeleteAnimal/${AnimalId}`;
    const updatedAnimals =  this.genericHttpService.getBy(url, [])
    updatedAnimals.subscribe({
      next: (updated) => this.animalsSource.next(updated)
    });
    return updatedAnimals;
  }

  getAnimales(ownerId: number){
    const url = `${this.baseUrl}/GetAnimales/${ownerId}`;
    const updatedAnimals =  this.genericHttpService.getBy(url, [])
    updatedAnimals.subscribe({
      next: (updated) => this.animalsSource.next(updated)
    });
    return updatedAnimals;
  }

  getAllAnimales(){
    const url = `${this.baseUrl}/GetAllAnimales`;
    const updatedAnimals =  this.genericHttpService.getBy(url, [])
    updatedAnimals.subscribe({
      next: (updated) => this.allAnimalsSource.next(updated)
    });
    return updatedAnimals;
  }

  getAnimalGenders(){
    const url = `${this.baseUrl}/getAnimalGenders`;
    const updatedGenders =  this.genericHttpService.getBy(url, [])
    updatedGenders.subscribe({
      next: (updated) => this.animalsGenders.next(updated)
    });
    return updatedGenders;
  }

  public existGenders(){
    if(this.animalsBreeds.value.length > 0){
      return true;
    }else{
      return false;
    }
  }

  getAnimalBreeds(){
    const url = `${this.baseUrl}/getAnimalBreeds`;
    const updatedBreeds =  this.genericHttpService.getBy(url, [])
    updatedBreeds.subscribe({
      next: (updated) => this.animalsBreeds.next(updated)
    });
    return updatedBreeds;
  }

  public existBreeds(){
    if(this.animalsBreeds.value.length > 0){
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
    const updatedTypes =  this.genericHttpService.getBy(url, [])
    updatedTypes.subscribe({
      next: (updated) => this.animalsTypes.next(updated)
    });
    return updatedTypes;
  }
  public exictTypes(){

    if(this.animalsTypes.value.length > 0){
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
