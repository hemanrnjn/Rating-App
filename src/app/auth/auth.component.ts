import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

declare var $: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public loginPage = false;
  public registerPage = true;
  public error: any;
  public email: string;
  public password: string;
  public username: string;
  public allTempRegisteredUsers: any;
  public allRegisteredUsers: any[];
  public invaliduser: any;
  public loginemail: any;
  public loginpassword: any;
  public tempname;
  registerForm: FormGroup;
  loginForm: FormGroup;


  constructor( private authService: AuthService, public dataService: DataService,
               private router: Router, public afAuth: AngularFireAuth) {

    this.dataService.userData.subscribe(data => {
      this.allTempRegisteredUsers = data;
      const obj = this.allTempRegisteredUsers;
      const arr = [];
      for (const prop in obj) {
        arr.push(obj[prop]);
      }
      console.log(arr);
      this.allRegisteredUsers = arr;
    });

    this.registerForm = new FormGroup({
      'regname':new FormControl('', Validators.required),
      'regusername':new FormControl('', Validators.required),
      'regemail':new FormControl('', Validators.required),
      'regpassword':new FormControl('', Validators.required),
    });
    this.loginForm = new FormGroup({
      'logemail': new FormControl('', Validators.required),
      'logpassword': new FormControl('', Validators.required)
    });


  }

  ngOnInit() {
  }


  registerTab() {
    $('#register-tab').addClass('active-tab');
    $('#login-tab').removeClass('active-tab');
    this.registerPage = true;
    this.loginPage = false;
  }

  loginTab() {
    $('#register-tab').removeClass('active-tab');
    $('#login-tab').addClass('active-tab');
    this.registerPage = false;
    this.loginPage = true;
  }

  onRegSubmit() {
    this.email = this.registerForm.value.regemail;
    this.password = this.registerForm.value.regpassword;
    this.username = this.registerForm.value.regusername;
    for (let i = 0; i < this.allRegisteredUsers.length; i++) {
      if (this.username == this.allRegisteredUsers[i].username) {
        this.invaliduser = true;
        $("#snackbar").html("<div style='color:red;'>Username Already Taken!</div>");
        $("#snackbar").addClass("show");
        //this.hide();
        setTimeout(() => { $("#snackbar").removeClass("show"); }, 4000);
        break;
      }
      else if (this.email == this.allRegisteredUsers[i].email) {
        this.invaliduser = true;
        $("#snackbar").html("<div style='color:red;'>Email Id Already Registered!</div>");
        $("#snackbar").addClass("show");
        //this.hide();
        setTimeout(() => { $("#snackbar").removeClass("show"); }, 4000);
        break;
      }
      else if(this.password.length < 6) {
        this.invaliduser = true;
        $("#snackbar").html("<div style='color:red;'>Password must be 6-12 characters long!</div>");
        $("#snackbar").addClass("show");
        //this.hide();
        setTimeout(() => { $("#snackbar").removeClass("show"); }, 4000);
      }
    }
    if (!this.invaliduser) {
      $("#snackbar").html("<div>Khata khul raha hai !</div>");
      $("#snackbar").addClass("show");
      //this.hide();
      setTimeout(() => { $("#snackbar").removeClass("show"); }, 3000);
      this.authService.registerUser(this.email, this.password);
      this.dataService.saveUserInfoFromForm(this.username, this.email);
    }
  }


  onLogSubmit() {
    this.loginemail = this.loginForm.value.logemail;
    this.loginpassword = this.loginForm.value.logpassword;
    $("#snackbar").html("<div>Ruk Jaa Re Bande...</div>");
    $("#snackbar").addClass("show");
    //this.hide();
    setTimeout(() => { $("#snackbar").removeClass("show"); }, 3000);
    this.authService.loginUser(this.loginemail, this.loginpassword);
  }

}
