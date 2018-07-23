import { Component, OnInit, Input } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { PopupService } from "../../popup.service";

@Component({
  selector: "app-info-modal",
  templateUrl: "./info-modal.html"
})
export class InfoModalComponent implements OnInit {
  title;
  text;
  label;
  callback;

  constructor(private viewCtrl: ViewController, private params: NavParams) {}

  ngOnInit() {
    this.title = this.params.data.title;
    this.text = this.params.data.text;
    this.label = this.params.data.label;
    this.callback = this.params.data.callback;
  }

  dismiss() {
    this.viewCtrl.dismiss();
    this.callback();
  }
}
