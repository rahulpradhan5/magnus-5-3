import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-epin',
  templateUrl: './check-epin.component.html',
  styleUrls: ['./check-epin.component.css']
})
export class CheckEpinComponent implements OnInit {
  firestore: AngularFirestore;
  phone_no: string = '';
  password: string = '';
  otp: string = '';
  otp_test: string = '';
  otp_verified: boolean = false;
  uid: any;
  userData: any;
  item: any;
  email: any;
  epin:any;
  mpin:any;
  constructor(private http: HttpClient,private auth: AuthService, fStore: AngularFirestore, public auths: AngularFireAuth, private storage: AngularFireStorage, private router: Router) {
    this.firestore = fStore;
  }

  ngOnInit(): void {
    this.uid = sessionStorage.getItem('firebaseUserId');
  }

  checkPassword() {
    if (this.password === '') {
      alert('Please enter password');
      return;
    }
    this.http.get('http://moneysagaconsultancy.com/api/api/getEpin?user_id='+this.uid)
    .subscribe((data:any) => {
      if (data?.data?.[0]?.['epin']) {
        this.mpin = data.data[0]['epin'];
      } else {
        this.mpin = undefined;
      }
      
      if(this.mpin == undefined){
        const docRef = this.firestore.collection('users').doc(this.uid);
        docRef.get().subscribe((doc: any) => {
          if (doc.exists) {
            // retrieve the password from the document
            this.email = doc.data().email;
            // verify the user's password
            this.auths.signInWithEmailAndPassword(this.email, this.password)
              .then(userCredential => {
                // password is correct
                this.http.get('http://moneysagaconsultancy.com/api/api/generateEpin?user_id='+this.uid)
        .subscribe((data:any) => {
          alert('your epin is='+data.epin)
        });
              })
              .catch(error => {
                // password is incorrect or user doesn't exist
               alert('password not same')
              });
          }
        });
      }else{
        alert('epin already generated = '+this.mpin);
      }
    });
   
  }

}

