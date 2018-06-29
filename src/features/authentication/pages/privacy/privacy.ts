import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage({
  segment: "PrivacyPage",
  priority: "high"
})
@Component({
  selector: "app-privacy",
  templateUrl: "./privacy.html"
})
export class PrivacyPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToLogin() {
    this.navCtrl.push("LoginPage");
  }
}
