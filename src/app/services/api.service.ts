import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getContent(endpoint:any){
    return this.http.get(environment.phpUrl + endpoint)
  }
}
