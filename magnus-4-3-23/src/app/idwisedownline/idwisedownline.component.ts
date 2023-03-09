import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-idwisedownline',
  templateUrl: './idwisedownline.component.html',
  styleUrls: ['./idwisedownline.component.css']
})
export class IdwisedownlineComponent implements OnInit {

  constructor(private http: HttpClient) { }
  apiResponse: any;
  data:any;
  ngOnInit(): void {
    this.http.get<any>('http://moneysagaconsultancy.com/api/api/totaluserdata?user_id=ab00003').subscribe(response => {
        this.apiResponse = response;
     this.data = this.apiResponse.total_details.leftdata.concat(this.apiResponse.total_details.rightdata);
    
    });
}

}
