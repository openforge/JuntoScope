import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage({
  segment: "TermsPage",
  priority: "high"
})
@Component({
  selector: "app-terms",
  templateUrl: "./terms.html"
})
export class TermsPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToLogin() {
    this.navCtrl.push("LoginPage");
  }
}
