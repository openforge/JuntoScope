import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class SettingsService {
  constructor(private afs: AngularFirestore) {}

  getFaqs() {
    return this.afs.collection(`/faqs`).valueChanges();
  }
}
