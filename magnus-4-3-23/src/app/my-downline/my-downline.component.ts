import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-downline',
  templateUrl: './my-downline.component.html',
  styleUrls: ['./my-downline.component.css']
})
export class MyDownlineComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://moneysagaconsultancy.com/api/api/totaluserdata?user_id=ab00003')
    .subscribe((data:any) => {
      console.log(data);
    })
  }

}
