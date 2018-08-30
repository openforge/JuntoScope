import { Component, OnInit } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: "app-verify-modal",
  templateUrl: "./verify-modal.component.html"
})
export class VerifyModalComponent implements OnInit {
  connectionData;

  constructor(private params: NavParams, private viewCtrl: ViewController) {}

  ngOnInit() {
    console.log(this.params.data.connectionData);
    this.connectionData = this.params.data.connectionData;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
