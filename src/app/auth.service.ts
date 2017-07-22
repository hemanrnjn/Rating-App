import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  public error: any;
  public isLoggedIn: any;
  public username: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  registerUser(email, password) {
    console.log(email);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      (success) => {
        console.log(success);
        this.isLoggedIn = true;
        if (localStorage.getItem('username')) {
          this.username = localStorage.getItem('username');
          this.router.navigateByUrl('/user/' + this.username + '');
        }
        else {
          console.log('nhi ho payga hmse!');
          this.router.navigateByUrl('/user');
        }
      }).catch(
      (err) => {
        console.log(err);
        this.error = err;
      });

  }

  loginUser(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        (success) => {
          console.log(success);
          this.isLoggedIn = true;
          if (localStorage.getItem('username')) {
            this.username = localStorage.getItem('username');
            this.router.navigateByUrl('/user/' + this.username + '');
          }
          else {
            // console.log('nhi ho payga hmse!');
            this.router.navigateByUrl('/user');
          }
        }).catch(
      (err) => {
        console.log(err);
        this.error = err;
      });
  }
}
