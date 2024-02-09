// answer-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerStatus } from 'src/app/interfaces/AnswerStatus';
import { Answer } from 'src/app/interfaces/answer';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit {
  private answerCounter = 0;
  @Input() answerForm!: FormGroup;
  @Output() answerChanged = new EventEmitter<Answer>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.answerForm = this.fb.group({
      id: [this.generateUniqueId()],
      content: ['', [Validators.required]],
      AnswerStatus: [AnswerStatus.WRONG, [Validators.required]]
    });
    this.emitAnswer();
  }

  AnswerStatus(answerStatus: AnswerStatus): void {
    if (answerStatus === AnswerStatus.WRONG) {
      this.answerForm.patchValue({ AnswerStatus: AnswerStatus.RIGHT });
    } else {
      this.answerForm.patchValue({ AnswerStatus: AnswerStatus.WRONG });
    }
    this.emitAnswer();
  }

  onContentChange(): void {
    this.emitAnswer();
  }

  emitAnswer(): void {
    const answer: Answer = {
      id: this.answerForm.value.id,
      content: this.answerForm.value.content,
      status: this.answerForm.value.AnswerStatus
    };
    this.answerChanged.emit(answer);
  }

  private generateUniqueId(): number {
    return this.answerCounter++;
  }
}
