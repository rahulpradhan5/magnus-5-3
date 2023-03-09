import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tdsdetails',
  templateUrl: './tdsdetails.component.html',
  styleUrls: ['./tdsdetails.component.css']
})
export class TDSDetailsComponent implements OnInit {

  commisiondata:any[]=[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const uid = sessionStorage.getItem('firebaseUserId');
    this.http.get('https://moneysagaconsultancy.com/api/api/commision?user_id='+uid)
      .subscribe((datas:any) => {
        this.commisiondata=datas.data;
        
      });
  }
  getSumOfAmount() {
    return this.commisiondata.reduce((acc, commisiondata) => acc + commisiondata.revenue, 0);
  }
  getSumOfDiuduction() {
    return this.commisiondata.reduce((acc, commisiondata) => acc + commisiondata.diducted, 0);
  }

}
