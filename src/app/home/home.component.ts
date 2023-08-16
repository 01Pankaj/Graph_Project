import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cnt_form:FormGroup;
  cnt_id:number;
  submitted:boolean = false;
  data:any;
  videoUrl:string;
  // emotionData:any;
  reactionData:any;
  currentTime:number;

  Play: boolean = false;
  Stop: boolean = true;
  Duration: any;
  videoDuration: any;
  emotionData: any = [];
  emotionDataAll: any = [];
  interval:any;
  interval2:any;
  Started: boolean = false;
  Paused:boolean = false;
  End:boolean = false;
  videoCurrentTime:any;
  Waiting:boolean = false;
  @ViewChild('video') video:ElementRef;
  @ViewChild('videoPlay') videoPlay:ElementRef;
  constructor(private _fb:FormBuilder, private _api:ApiService) { }

  ngOnInit(): void {
    this.formValidation();
  }

  
  formValidation(){
    this.cnt_form = this._fb.group({
      cnt_id : new FormControl('', Validators.required)
    })
  }

 

  submit(){
    this.cnt_id = this.cnt_form.value.cnt_id;
    console.log("Hello from submit function");
    this.submitted = true;
    this._api.getEmotion(`emotion/get_emotion?minute=${0}&cnt_id=${this.cnt_id}`).subscribe((data:any)=>{
      console.log("Emotion data",data);
      this.emotionDataAll = data.response.graph_data;
      setTimeout(() => {
        if(this.reactionData && this.emotionDataAll && this.videoUrl){
          this.data = true;
        }
      }, 1000);
    })
    this._api.getReaction(`reaction/get_reaction?minute=${0}&cnt_id=${this.cnt_id}`).subscribe((data:any)=>{
      // console.log("Reaction data",data);
      this.reactionData = data.response;
    })
    this._api.getDetails(`content/get_details?cnt_id=${this.cnt_id}`).subscribe((data:any)=>{
      // console.log("Details data",data);
      this.videoUrl = `${environment.storageUrl}${data.response.cnt_url}`;
      // console.log(this.videoUrl);
      
    })
  }

  PlayVideo(e:any){
    // console.log(this.video);
    // console.log(this.emotionData,this.video.nativeElement.currentTime);
    
   
  }

  Progress(e:any){
    // console.log(this.video.nativeElement.currentTime);
    this.data = this.emotionDataAll.graph_data[Math.ceil(this.video.nativeElement.currentTime)].attention;
    this.currentTime = Math.ceil(this.video.nativeElement.currentTime)
  }


    // ************************************************************** Function to play video **********************************************************

    play() {
      this.videoPlay.nativeElement.play();
      this.Play = true;
      this.Stop = false;
    }
  
    // ************************************************************** Function to stop video **********************************************************
    stop() {
      this.videoPlay.nativeElement.pause();
      this.Play = false;
      this.Stop = true;
    }
  
     // ************************************************************** Function hits on starting of video **********************************************************
  Start(e: any) {
    if (e.target.currentTime === 0) {
      this.emotionData = [];

    }
    this.interval2 = setInterval(() => {
      this.Started = true;
      this.Paused = false;
      this.End = false;
      if(!this.Waiting){
      // ***************************************** Filtering Data according to video current time and sending the data to chart component per second ******************************************
      for (let i = 0; i < this.emotionDataAll.length; i++) {
        if (this.emotionDataAll[i].time === Math.floor(this.videoCurrentTime)) {
          this.emotionData.push(this.emotionDataAll[i])
        }
      }
    }
      console.log("New Data", this.emotionData,this.emotionDataAll,this.videoCurrentTime);
    }, 1000)
    console.log("Started", e);
    this.interval = setInterval(() => {
      this.Duration = Math.ceil((this.videoPlay.nativeElement.currentTime / this.videoPlay.nativeElement.duration) * 100);
    }, 5)

  }

  // ************************************************************** Function hits when video is paused **********************************************************
  Pause(e: any) {
    console.log("Paused", e);
    clearInterval(this.interval)
    clearInterval(this.interval2);
    this.Started = false;
    this.Paused = true;
  }

  // ************************************************************** Function hits when video ends **********************************************************
  Ended(e: any) {
    console.log("Ended", e);
   this.Play = false;
   this.Stop = true;
    clearInterval(this.interval);
    clearInterval(this.interval2);
    this.End = true;
    this.Started = false;
    
  }

  // ************************************************************** Function hits on progress of video **********************************************************
  ontimeUpdate(e) {
    this.videoCurrentTime = Math.ceil(e.target.currentTime);
  }

  // ************************************************************** Function hits when video buffers **********************************************************
  waiting() {
    console.log(this.video, "waiting");
    // this.video.nativeElement.pause();
    this.Waiting = true;
  }

  // ************************************************************** Function hits when video start again after buffering **********************************************************
  playing() {
    console.log(this.video, "playing");
    this.Waiting = false;
  }

}
