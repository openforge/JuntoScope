import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  NOT_APPLICABLE,
  MORE_INFO_NEEDED
} from "../../../../app/app.constants";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.component.html",
  styleUrls: ["./vote.component.scss"]
})
export class VoteComponent implements OnInit {
  @Output() vote = new EventEmitter<any>();

  voteForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.voteForm = this.fb.group({
      estimate: ["", Validators.required]
    });
  }

  needMoreInfo() {
    this.vote.emit(MORE_INFO_NEEDED);
  }

  notApplicable() {
    this.vote.emit(NOT_APPLICABLE);
  }

  sendVote() {
    this.vote.emit(this.voteForm.value.estimate);
  }
}
