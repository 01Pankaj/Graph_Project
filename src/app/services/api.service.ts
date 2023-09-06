import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private _notify = new BehaviorSubject<any>({status: 'success', message: 'message', start: false, code: 200});
  notify$ = this._notify.asObservable();

  obNotify(data: any): void {
    console.log(data);
    
    this._notify.next(data);
  }
  
  getEmotion(endpoint:any){
    return this.http.get(environment.nodeUrl + endpoint)
  }

  getReaction(endpoint:any){
    return this.http.get(environment.nodeUrl + endpoint)
  }

  getCohorts(endpoint:any){
    return this.http.get(environment.nodeUrl + endpoint)
  }

  getDetails(endpoint:any){
    return this.http.get(environment.nodeUrl + endpoint)
  }

  getContent(endpoint:any){
    return this.http.get(environment.phpUrl + endpoint)
  }

  @Output() pauseGraphEmitter = new EventEmitter();
  pauseVideo(data:any){
    this.pauseGraphEmitter.emit(true)
  }

  @Output() videoStartEmitter = new EventEmitter();
  videoStart(data:any){
    this.videoStartEmitter.emit(true)
  }

  @Output() videoEndEmitter = new EventEmitter();
  videoEnd(data:any){
    this.videoEndEmitter.emit(true)
  }
  @Output() exitFullscreenEvent = new EventEmitter();
  exitFullscreen(data: any){
    this.exitFullscreenEvent.emit(true);
  }
}
