import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.scss']
})
export class CohortsComponent implements OnInit {

  @Input() metricsData:any;
  cnt_id:any;
  selectCohort:any = 0;
  constructor(private _api:ApiService) {
    this.cnt_id = +localStorage.getItem('cnt_id');
   }

  ngOnInit(): void {
    console.log("Hello from cohort component",this.metricsData);
    
  }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Function for getting the emotion data of the campaign ( by Pankaj Phour) on january 27 2023 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    getEmotion(e) {
      const fil = e && e.name !== 'All' ? (e.name === 'Male') ? '&gender=m' : (e.name === 'Female') ?  '&gender=f' : '&age_range=' + e.name : '';
      this._api.getEmotion('emotion/get_emotion?minute=0' + '&cnt_id=' + this.cnt_id + fil ).subscribe((next:any) => {
        if (next && next.response) {
          console.log("Response of get emotion component",next);
          
        }
  
      });
    }

}
