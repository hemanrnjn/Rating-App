import { Component, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {AngularFireAuth} from "angularfire2/auth";
import {DataService} from "../data.service";
import {isUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy {
  private subscription: Subscription;
  public username: any;
  public authusername: any;
  public isLoggedIn: any;
  public emailid: any;
  public validuser = false;
  public invaliduser = false;
  public loggedUser = false;
  public allTempRegisteredUsers: any;
  public allRegisteredUsers: any[] = [];
  public allTempRates: any;
  public allRates: any[] = [];
  public option: any;
  public hasRated: any;
  public average = 0;
  public isDataAvailable = false;
  public temp = 0;
  public count = 0;

  constructor(public afAuth: AngularFireAuth,
              public dataService: DataService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.emailid = localStorage.getItem('email');

    this.afAuth.authState.subscribe( data => {
      if (data) {
        localStorage.setItem('email' , data.email);
        this.emailid = localStorage.getItem('email');
        console.log('logged email ' + this.emailid);
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.subscription = activatedRoute.params.subscribe(
      param => {
        this.username = param['username'];
        console.log('user is : ' + this.username);
        this.dataService.userData.subscribe(data => {
          this.allTempRegisteredUsers = data;
          const obj = this.allTempRegisteredUsers;
          const arr = [];
          for (const prop in obj) {
            arr.push(obj[prop]);
          }
          console.log(arr);
          this.allRegisteredUsers = arr;

          for (let i = 0; i < this.allRegisteredUsers.length; i++) {
            if (this.username == this.allRegisteredUsers[i].username) {
              this.validuser = true;
              this.invaliduser = false;
              console.log('mil gya ' + this.username);
            }
            if (this.emailid == this.allRegisteredUsers[i].email) {
              this.authusername = this.allRegisteredUsers[i].username;
              console.log("mila h ye : " + this.authusername);
            }
          }
          // for (let i = 1; i < this.allRegisteredUsers.length; i++) {
          //   if (this.emailid == this.allRegisteredUsers[i].email) {
          //     this.authusername = this.allRegisteredUsers[i].username;
          //     console.log("mila h ye : " + this.authusername);
          //     break;
          //   }
          // }
          for (let i = 0; i < this.allRegisteredUsers.length; i++) {
            if (this.username == this.allRegisteredUsers[i].username) {
              this.allTempRates = this.allRegisteredUsers[i].rates;
              const obj1 = this.allTempRates;
              const arr1 = [];
              for (const prop in obj1) {
                arr1.push(obj1[prop]);
              }
              console.log('convert kiya hua' + arr1);
              this.allRates = arr1;
              this.count = this.allRates.length;
              for (let j = 0; j < this.allRates.length; j++ ) {
                this.temp = this.temp + parseInt(this.allRates[j], 10);
                console.log('broken down ' + this.temp);
              }
              this.average = this.temp / this.count;
              break;
            }
          }
          if (isUndefined(this.username)) {
            if (this.isLoggedIn) {
              this.loggedUser = true;
            }
            else {
              this.router.navigateByUrl('/auth');
            }
            this.invaliduser = false;
          }
          else if (this.validuser) {
            if (this.username == this.authusername) {
              this.loggedUser = true;
              this.validuser = false;
              this.invaliduser = false;
            }
            else {
              this.validuser = true;
              this.invaliduser = false;
              this.loggedUser = false;
              localStorage.setItem('username', this.username);
            }
          }
          else {
            this.invaliduser = true;
            this.validuser = false;
            this.loggedUser = false;
          }
        });
        this.isDataAvailable = true;
      }
    );
  }

  goToAuth() {
    this.router.navigateByUrl('/auth');
  }

  goToHome() {
    this.router.navigateByUrl('/user/' + this.authusername + '');
  }

  uservoted(event) {
    this.option = event.target.id;
    console.log('ye rha auth name ' + this.authusername);
    $("#snackbar").html("<div>Rate Recorded!</div>");
    $("#snackbar").addClass("show");
    //this.hide();
    setTimeout(() => { $("#snackbar").removeClass("show"); }, 3000);
    this.dataService.db.object('registeredUsers/' + this.username + '/rates/').
    update({[this.authusername]: this.option});
    setTimeout( () => {this.router.navigateByUrl('user/' + this.username); } , 5000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.invaliduser = false;
    this.validuser = false;
    this.loggedUser = false;
    localStorage.setItem('email' , '');
  }

}
