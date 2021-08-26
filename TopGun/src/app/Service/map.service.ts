import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapMarker } from '../model/map-marker';
import { GenericHttpService } from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private genericHttpService: GenericHttpService) { }

  private mapMarkerSource: BehaviorSubject<MapMarker> = new BehaviorSubject<MapMarker>(MapMarker.empty());
  public currentMapMarker: Observable<MapMarker> = this.mapMarkerSource.asObservable();

  private mapMarkerListSource: BehaviorSubject<MapMarker[]> = new BehaviorSubject<MapMarker[]>([]);
  public currentMapMarkerList: Observable<MapMarker[]> = this.mapMarkerListSource.asObservable();

  public getAllMapMarkers() {

    this.getMapMarkers().subscribe((res) => {

      if (res) {
        this.setMapMarkerList(res);
      }

    });

  }


  /**
   * Addd user to server
   */
  public getMapMarkers(): Observable<any> {

    const url = environment.getMapMarkers;

    return this.genericHttpService.get<MapMarker[]>(url);
  }


      public setMapMarker(mapMarker: MapMarker) {

        this.mapMarkerSource.next(mapMarker);
    
      }
    

      public getMapMarker() {
    
        return this.mapMarkerSource.value;
    
      }


    public setMapMarkerList(mapMarker: MapMarker[]) {

      this.mapMarkerListSource.next(mapMarker);
  
    }
  
    /**
     * Get current value from Observable without subscribing (just want value one time).
     */
    public getMapMarkerList() {
  
      return this.mapMarkerListSource.value;
  
    }

    public checkMapMarkerLis(){

      if(this.mapMarkerListSource.value){
        return true;
      }else{
        return false;
      }
  
    }

    public checkMapMarker(){

      if(this.mapMarkerSource.value){
        return true;
      }else{
        return false;
      }
  
    }



}
