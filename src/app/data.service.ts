import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";

@Injectable()
export class DataService {

  public userData: FirebaseObjectObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.userData = this.db.object('registeredUsers');
  }

  saveUserInfoFromForm(username, email) {
    return this.db.object('registeredUsers').update({
      [username]: {
        username: username,
        email: email,
        rates: ''
      }
    });
  }

}
