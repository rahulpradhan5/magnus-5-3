import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Tree {
  left?: string;
  right?: string;
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string = '';
  password: string = '';
  name?: any;
  mobileNo: string = '';
  invitationCode: string = '';
  id: string = '';
  branch: string = '';
  myid?: string = '';
  apiResponse: any;
  signInMethods: any;
  names?: any;
  items:any;
  tree?: Tree = {
  };


  cid?: ID;

  constructor(private http: HttpClient, public rout: ActivatedRoute, private auth: AuthService, private fauth: AngularFireAuth, private fdb: AngularFirestore) {
    this.id = rout.snapshot.params['id'];
    this.branch = rout.snapshot.params['branch'];
    auth.logout();
    fauth.user.subscribe(user => {
      this.myid = user?.uid;
      if(this.myid != 'undefined'){
       this. apicall(this.myid);
    }}
    )


  }

  ngOnInit(): void {
  }

  apicall(uid:any){
    this.items = this.fdb.collection('users').doc(uid).valueChanges();
    this.items.subscribe((data:any) =>{
    this.http.get<any>('http://moneysagaconsultancy.com/api/api/insert?user_id='+this.myid+'&name='+data.fullName+'&referal_id='+this.id+'&position='+this.branch).subscribe(response => {
console.log(response);
    })
    })
  }

   register() {

    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    if (this.name == '') {
      alert('Please enter name');
      return;
    }

    if (this.mobileNo == '') {
      alert('Please enter mobileNo');
      return;
    }

    if (this.invitationCode == '') {
      alert('Please enter invitationCode');
      return;
    }

    this.auth.register(this.email, this.password, this.name, this.mobileNo, this.id);
   
    this.email = '';
    this.password = '';
    this.name = '';
    this.invitationCode = '';
    this.mobileNo = '';
    this.names = this.name;
    this.setLocationInTree(this.id);


  }


    setLocationInTree(id: string) {

      if (this.branch == 'left') {
        this.fdb.collection('users').doc(id).collection<Tree>('tree').doc('childs').valueChanges().subscribe(data => {
          if (data?.left == undefined) {
            this.tree!.left = this.myid;
            console.log('inserted')
            this.fdb.collection('users').doc(id).collection<Tree>('tree').doc('childs').set(this.tree!, { merge: true })
            // this.fdb.collection('users').doc(id).collection<ID>('team').doc(this.myid).set({cId:this.myid})
            this.auth.logout()
          } else {
            console.log(data.left)
            this.setLocationInTree(data.left)
          }
        })
      } else {
        this.fdb.collection('users').doc(id).collection<Tree>('tree').doc('childs').valueChanges().subscribe(data => {
          if (data?.right == undefined) {
            this.tree!.right = this.myid;
            this.fdb.collection('users').doc(id).collection<Tree>('tree').doc('childs').set(this.tree!, { merge: true })
            // this.fdb.collection('users').doc(id).collection<ID>('team').doc(this.myid).set({cId:this.myid})
            this.auth.logout()
          } else {
            this.setLocationInTree(data.right)

          }
        })
      }
    }
  }

interface ID {
  cId?: string;
}

