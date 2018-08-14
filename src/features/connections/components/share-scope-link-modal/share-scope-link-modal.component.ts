import { Component, OnInit } from "@angular/core";
import { NavParams, NavController, ViewController } from "ionic-angular";

@Component({
  selector: "app-share-scope-link",
  templateUrl: "./share-scope-link-modal.component.html"
})
export class ShareScopeLinkModalComponent implements OnInit {
  connectionName;
  projectName;
  sessionUrl;
  accessCode;
  accessCodeLetters;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.connectionName = this.params.data.connectionName;
    this.projectName = this.params.data.projectName;
    this.sessionUrl = this.params.data.sessionUrl;
    this.accessCode = this.params.data.accessCode;
    this.accessCodeLetters = this.accessCode.split("");
  }

  startScoping() {
    this.viewCtrl.dismiss();
    this.navCtrl.push("SessionScopingPage", { sessionUrl: this.sessionUrl });
  }

  goDashboard() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot("DashboardPage");
  }
}
