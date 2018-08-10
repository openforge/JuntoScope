import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.component.html"
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

  sendVote() {
    this.vote.emit(this.voteForm.value.estimate);
  }
}
