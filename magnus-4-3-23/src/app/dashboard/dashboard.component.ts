import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any[] = [];
  todayData: any[] = [];
  totalData: any[] = [];
  downlineCount: any;
  totalDataconleft: any;
  totalDataconright: any;
  totalleftpv: any;
  totalconfirmleftpv: any;
  totalrightpv: any;
  totalcomfirmrightpv: any;
  todayDataleftconfirmcount: any;
  todayDatarightconfirmcount: any;
  todayLeftcount: any;
  todayRightcount: any;
  todayRightcountPv: any;
  todayLeftcountPv: any;
  confirmtodayRightcountPv: any;
  confirmtodayLeftcountPv: any;
  ownPv: any;
  todayownPv: any;
  totalLeftcount: any;
  totalrightcount: any;
  startDate: any;
  endDate: any;
  rank: any;
  days:any;
  hours:any;
  minutes:any;
  seconds:any;
  remainingTime:any;
  constructor(fauth: AngularFireAuth, rout: Router, public fas: AngularFirestore, private http: HttpClient, public ActiveRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // const uid = 'ab00003';
    const uid = sessionStorage.getItem('firebaseUserId');
    this.http.get('http://moneysagaconsultancy.com/api/api/totaluserdata?user_id=' + uid)
      .subscribe((data: any) => {
        console.log(data);
        this.userData = data.allusers;
        this.todayDataleftconfirmcount = data.today_data_left_count_confirm;
        this.todayDatarightconfirmcount = data.today_data_left_count_confirm;
        this.totalData = data.total_details;
        this.todayLeftcount = data.today_left_count;
        this.todayRightcount = data.today_right_count;
        this.confirmtodayLeftcountPv = data.today_left_count_confirm_pv;
        this.confirmtodayRightcountPv = data.today_right_count_confirm_pv;
        this.totalDataconleft = data.total_details.comfirm_leftcount;
        this.totalDataconright = data.total_details.comfirm_rightcount;
        this.downlineCount = data.downline_count;
        this.totalleftpv = data.total_left_pv;
        this.totalrightpv = data.total_right_pv;
        this.totalconfirmleftpv = data.total_confirm_left_pv;
        this.totalcomfirmrightpv = data.total_confirm_right_pv;
        this.todayLeftcountPv = data.today_left_count_pv;
        this.todayRightcountPv = data.today_right_count_pv;
        this.ownPv = data.ownPv;
        this.todayownPv = data.TodayownPv;
        this.totalLeftcount = data.total_details.leftdata.length;
        this.totalrightcount = data.total_details.rightdata.length;
        this.startDate = data.subcription[0].start_date;
        this.endDate = data.subcription[0].end_date;
       
        this.rank = data.rank;
        
        // Convert the time difference to days, hours, minutes, and seconds
       if(this.endDate != '' && this.endDate !='0000-00-00'){
        setInterval(() => {
          this.remainingTime = this.updateRemainingTime() ;
        }, 1000);
      }else{
        this.remainingTime = 'Life Time'
      }
        
      });
  }
  updateRemainingTime() {
    const timeDiff = new Date(this.endDate).getTime() - new Date().getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    console.log(this.remainingTime);
  }

}
