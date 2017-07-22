import { Component } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoggedIn: any = false;
  public emailid: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe( data => {
      if (data) {
        this.isLoggedIn = true;
        this.emailid = data.email;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/auth');
    this.isLoggedIn = false;
    localStorage.setItem('username' , '');
    localStorage.setItem('email' , '');
  }
}
