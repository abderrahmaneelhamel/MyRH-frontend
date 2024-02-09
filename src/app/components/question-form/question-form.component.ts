// question-form.component.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AnswerStatus } from 'src/app/interfaces/AnswerStatus';
import { Answer } from 'src/app/interfaces/answer';
import { Question } from 'src/app/interfaces/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  private answerCounter = 0;
  @Input() questionForm!: FormGroup;
  @Output() questionChanged = new EventEmitter<Question>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      answers: this.fb.array([]),
    });
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer(): void {
    const newAnswer = this.fb.group({
      id: [this.generateUniqueId()],
      content: ['', [Validators.required]],
      status: [AnswerStatus.WRONG, [Validators.required]]
    });
  
    // Subscribe only once when the answer is added
    newAnswer.valueChanges.pipe(take(1)).subscribe(() => {
      this.updateAnswersArray();
    });
  
    if (this.answers.length < 4) {
      this.answers.push(newAnswer);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "you can't add more than four answers",
      });
    }
  }

  removeAnswer(index: number): void {
    this.answers.removeAt(index);
    this.updateAnswersArray();
  }

  updateAnswersArray(emittedAnswer?: Answer): void {
    // Directly use the value property of the form controls
    const answersArray: Answer[] = this.answers.value;

    console.log('====================================');
    console.log('answersArray : ',answersArray,'emittedAnswer : ',emittedAnswer);
    console.log('====================================');
  
    // If an answer is emitted, find and update it in the array
    if (emittedAnswer) {
      const existingAnswerIndex = answersArray.findIndex(a => a.id === emittedAnswer.id);
  
      if (existingAnswerIndex !== -1) {
        // Update the existing answer
        answersArray[existingAnswerIndex] = emittedAnswer;
      } else {
        // Add the emitted answer to the array
        answersArray.push(emittedAnswer);
      }
    }
  
    // Validate the number of answers
    if (answersArray.length > 4) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "you can't add more than four answers",
      });
      return;
    }
  
    // Create the Question object
    const question: Question = {
      question: this.questionForm.get('question')?.value,
      answers: answersArray,
    };
  
    // Emit the updated question, including answers
    this.questionChanged.emit(question);
  }

  private generateUniqueId(): number {
    return this.answerCounter++;
  }
}
