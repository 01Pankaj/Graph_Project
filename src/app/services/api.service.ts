import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getEmotion(endpoint:any){
    return this.http.get(environment.nodeUrl + endpoint)
  }

  getReaction(endpoint:any){
    return this.http.get(environment.nodeUrl + endpoint)
  }

  getDetails(endpoint:any){
    return this.http.get(environment.nodeUrl + endpoint)
  }

  getSummary(endpoint:any){
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
}
