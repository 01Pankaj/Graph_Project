import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cnt_form:FormGroup;
  emotion_form:FormGroup;
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
  showControls:boolean = true;
  videoLoader:boolean = false;
  showSelect:boolean = false;
  emotiontSelected: boolean = false;
  selectedValue: any;
  @ViewChild('video') video:ElementRef;
  @ViewChild('videoPlay') videoPlay:ElementRef;
  emotions = ["Angry","Arousal","Attention","Disgust","Evalence","Happy","Neutral","Sad","Scare","Surprised"];
  cohort:any = {};
  cohorts:any = [
    {
      name: 'Emotion Intensity',
      image: 'emotion_intensity',
      type: 'single',
      control: 'emoting',
      values: [
        {name: 'High', value: 'high'},
        {name: 'Medium', value: 'medium'},
        {name: 'Low', value: 'low'}
      ]
    },
    {
      name: 'Age Group',
      type: 'single',
      image: 'age',
      control: 'age_range',
      values: [
        {name: '18-24', value: '18-24'},
        {name: '25-34', value: '25-34'},
        {name: '35-55', value: '35-55'},
        {name: 'Millennial (18-34)', value: '18-34'},
        {name: 'Non-Millennial (35-65)', value: '35-65'},
        {name: '17-29', value: '17-29'},
        {name: '30-49', value: '30-49'}
      ]
    },
    {
      name: 'Gender',
      type: 'single',
      image: 'gender',
      control: 'gender',
      values: [
        { name: 'Male', value: 'm'},
        { name: 'Female', value: 'f'}
      ]
    }
  ];
  constructor(private _fb:FormBuilder, private _api:ApiService) { }

  ngOnInit(): void {
    this.formValidation();
    this.emotionFormValidation();
  }

  
  formValidation(){
    this.cnt_form = this._fb.group({
      cnt_id : new FormControl('', Validators.required)
    })
  }

  emotionFormValidation(){
    this.emotion_form = this._fb.group({
      emotion : new FormControl('', Validators.required),
      cohort : new FormControl('', Validators.required)
    })
  }


 
// Function hits when user submits the cnt_id 
  submit(){
    this.cnt_id = this.cnt_form.value.cnt_id;
    this.submitted = true;
    this._api.getReaction(`reaction/get_reaction?minute=${0}&cnt_id=${this.cnt_id}`).subscribe((data:any)=>{
      if(data && !data.error){
        this.reactionData = data.response;
      }
      else{
        this._api.obNotify({
          start:true,
          code:200,
          status:'error',
          message: data.message
        })
      }
    })
    this._api.getDetails(`content/get_details?cnt_id=${this.cnt_id}`).subscribe((data:any)=>{
      if(data && !data.error){
      this.videoUrl = `${environment.storageUrl}${data.response.cnt_url}`;
      this.data = true;
      }else{
        this._api.obNotify({
          start:true,
          code:200,
          status:'error',
          message: data.message
        })
      }
    })
    this.getCohortsValue(this.cnt_id)
  }


  // Function hits when user selects the emotion and cohort for a cnt_id to plot the graph data 
  submitEmotion(){
    this.getEmotion(this.cnt_id,this.cohort)
    // this.emotiontSelected = true;
    // this.selectedValue = this.emotion_form.value.emotion.toLowerCase();
    
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
      this._api.videoStart(true);
      this.videoLoader = true;
      setTimeout(() => {
        this.videoLoader = false;
        this.videoPlay.nativeElement.play();
        this.Play = true;
        this.Stop = false;
      }, 1800);
      this.showControls = false;
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
      // console.log("New Data", this.emotionData,this.emotionDataAll,this.videoCurrentTime);
    }, 1000)
    console.log("Started", e);
    this.interval = setInterval(() => {
      this.Duration = Math.ceil((this.videoPlay.nativeElement.currentTime / this.videoPlay.nativeElement.duration) * 100);
    }, 5)

  }

  // ************************************************************** Function hits when video is paused **********************************************************
  Pause(e: any) {
    // console.log("Paused", e);
    clearInterval(this.interval)
    clearInterval(this.interval2);
    this.Started = false;
    this.Paused = true;
    this._api.pauseVideo(true)
  }

  // ************************************************************** Function hits when video ends **********************************************************
  Ended(e: any) {
    this._api.videoEnd(true)
    console.log("Ended", e);
   this.Play = false;
   this.Stop = true;
    clearInterval(this.interval);
    clearInterval(this.interval2);
    this.End = true;
    this.Started = false;
    this.showControls = true;
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
  
  // Function to get the corresponding cohorts value for the selected cnt_id 
  getCohortsValue(cnt_id:any){
    this._api.getCohorts(`additional_cohorts/get_additional_cohorts?cnt_id=${cnt_id}`).subscribe((success:any)=>{
      if (success && success.response) {
        const data = success.response.groups.map( (a, i) => {
          const ob = {};
          ob['name'] = a.group;
          ob['values'] = a.options.map( b => {
            const ab = {};
            ab['name'] = b.option;
            ab['value'] = b.slag;
            return ab;
          });
          return ob;
        });
       this.cohorts = this.cohorts.concat(data); 
      }
    })
  }


// Fucntion to concatenate the cohorts with the fixed ones 
  selectCohort(index:any,value:any){
    this.cohort = {};
    index === 0 ? this.cohort['emoting'] = value : index === 1 ? this.cohort['age-range'] = value : index === 2 ? this.cohort['gender'] = value : this.cohort['slag'] = value;
  }


  // Fucntion to get the emotion of the selected cnt_id and the selected cohorts value 
  getEmotion(cnt_id:any,cohort:any){
    this._api.getEmotion(`emotion/get_emotion?minute=${0}&cnt_id=${cnt_id}&${Object.keys(cohort)[0]}=${Object.values(cohort)[0]}`).subscribe((res:any)=>{
      if(res && !res.error && res.response.graph_data){
        this.emotionDataAll = res.response.graph_data;
        this.showSelect = true;
        this.data = true;
        this.emotiontSelected = true;
    this.selectedValue = this.emotion_form.value.emotion.toLowerCase();
      }
      else{
        this._api.obNotify({
          start:true,
          code:200,
          status:'error',
          message: res.message
        })
      }
    })

  }

}
