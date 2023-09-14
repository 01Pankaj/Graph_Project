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


  secondToMin(s) {
    const value = Number(s);
    if (value > 3600) {
      const hours   = Math.floor(value / 3600);
      const minutes = Math.floor((value - (hours * 3600)) / 60);
      const seconds = value - (hours * 3600) - (minutes * 60);
      return Math.floor(hours) < 10 ? '0' + Math.floor(hours) + '' + (Math.floor(minutes) < 10 ? '0' + Math.floor(minutes) + ':' + ( seconds < 10 ? '0' + seconds : seconds) + '' : Math.floor(minutes) + ':' + ( seconds < 10 ? '0' + seconds : seconds) + '') : Math.floor(hours) + '' + (Math.floor(minutes) < 10 ? '0' + Math.floor(minutes) + ':' + ( seconds < 10 ? '0' + seconds : seconds) + '' : Math.floor(minutes) + ':' + ( seconds < 10 ? '0' + seconds : seconds) + '');
    } else {
      const minutes: number = Math.floor(value / 60);
      return Math.floor(minutes) < 10 ? '0' + Math.floor(minutes) + ':' + ( Math.floor(value - minutes * 60) < 10 ? '0' + Math.floor(value - minutes * 60) + '' : Math.floor(value - minutes * 60)) : Math.floor(minutes) + ':' + ( Math.floor(value - minutes * 60) < 10 ? '0' + Math.floor(value - minutes * 60)  + '' : Math.floor(value - minutes * 60) + '') + '';
    }
  }
  minutesToSecond(data) {
    let sec = 0;
    const ar = data.split(':');
    let se = 1;
    for (let i = ar.length ; i > 0 ; i--) {
      if (ar[i - 1]) {
        sec += +ar[i - 1] * se;
        se *= 60;
      }
    }
    return sec;
  }
}
