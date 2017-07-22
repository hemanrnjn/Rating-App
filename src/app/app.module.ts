import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {AngularFireModule} from "angularfire2";
import { AuthComponent } from './auth/auth.component';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {AuthService} from "./auth.service";
import {DataService} from "./data.service";
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '' , component: UserComponent},
  {path: 'auth' , component : AuthComponent},
  {path: 'user' , component : UserComponent},
  {path: 'user/:username' , component : UserComponent}
];


export const firebaseConfig = {

// Initialize Firebase
  apiKey: "AIzaSyBEl294epEXQfARFOAOFoAcq2HIrx655r4",
  authDomain: "task2-103b8.firebaseapp.com",
  databaseURL: "https://task2-103b8.firebaseio.com",
  projectId: "task2-103b8",
  storageBucket: "task2-103b8.appspot.com",
  messagingSenderId: "247038666535"
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [DataService, AuthService, AngularFireAuth, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
