import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../model/like';
import { GenericHttpService } from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {


  constructor(private genericHttpService: GenericHttpService) { }

  private LikeSource: BehaviorSubject<Like> = new BehaviorSubject<Like>(Like.empty());
  public currentLike: Observable<Like> = this.LikeSource.asObservable();

  private LikeListSource: BehaviorSubject<Like[]> = new BehaviorSubject<Like[]>([]);
  public currentLikeList: Observable<Like[]> = this.LikeListSource.asObservable();

  private TotalLikeSource: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentTotalLike: Observable<number> = this.TotalLikeSource.asObservable();

  public getTotalLike(id: number, type: number) {

    this.getTotalLikeHttp(id, type).subscribe((res) => {

      if (res) {
        this.setTotalLikeValue(res);
      }else{
        this.setTotalLikeValue(res);
      }

    });

  }


  /**
   * Addd user to server
   */
  public getTotalLikeHttp(id: number, type: number): Observable<any> {

    const url = environment.getTotalLike;

    const parame = {id: id, type: type};

    return this.genericHttpService.get<number>(url, parame);
  }


  
  public setTotalLikeValue(TotalLike: number) {

    this.TotalLikeSource.next(TotalLike);

  }


  public getTotalLikeValue() {

    return this.TotalLikeSource.value;

  }


      public setLike(Like: Like) {

        this.LikeSource.next(Like);
    
      }
    

      public getLike() {
    
        return this.LikeSource.value;
    
      }


    public setLikeList(Like: Like[]) {

      this.LikeListSource.next(Like);
  
    }
  
    /**
     * Get current value from Observable without subscribing (just want value one time).
     */
    public getLikeList() {
  
      return this.LikeListSource.value;
  
    }

    public checkLikeLis(){

      if(this.LikeListSource.value){
        return true;
      }else{
        return false;
      }
  
    }

    public checkLike(){

      if(this.LikeSource.value){
        return true;
      }else{
        return false;
      }
  
    }

  
}
