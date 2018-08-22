import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

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
      estimate: ["", [Validators.required, this.isValid]]
    });
  }

  sendVote() {
    this.vote.emit(this.voteForm.value.estimate);
  }

  isValid(control: FormControl): any {
    if (control.value < 0.5) {
      return { invalid_quantity: true };
    }

    return null;
  }
}
