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
  @Input() questionForm!: FormGroup;
  @Output() questionChanged = new EventEmitter<Question>();
  answersArray : Answer[] = [];

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
      content: ['', [Validators.required]],
      status: [AnswerStatus.WRONG, [Validators.required]]
    });
  
    // Subscribe only once when the answer is added
    newAnswer.valueChanges.pipe(
      take(1),
    ).subscribe(value => {
      if (value) {
        const answer: Answer = {
          content: value.content || '',
          status: value.status || AnswerStatus.WRONG,
        };
        this.updateAnswersArray(answer);
      }
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
    this.answersArray.splice(index, 1);
    // Create the Question object
    const question: Question = {
      question: this.questionForm.get('question')?.value,
      answers: [...this.answersArray], // Make a copy of the array to avoid direct manipulation
    };
  
    // Emit the updated question, including answers
    this.questionChanged.emit(question);
  }

  updateAnswersArray(emittedAnswer?: Answer): void {
    // Directly use the value property of the form controls
  
    console.log('====================================');
    console.log('answersArray : ', this.answersArray, 'emittedAnswer : ', emittedAnswer);
    console.log('====================================');
  
    // If an answer is emitted, find and update it in the array
    if (emittedAnswer) {
      const existingAnswerIndex = this.answersArray.findIndex(a => a.id === emittedAnswer.id);
  
      if (existingAnswerIndex !== -1) {
        // Update the existing answer
        this.answersArray[existingAnswerIndex] = emittedAnswer;
      } else {
        // Add the emitted answer to the array
        this.answersArray.push(emittedAnswer);
      }
    }
  
    // Validate the number of answers
    if (this.answersArray.length > 4) {
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
      answers: [...this.answersArray], // Make a copy of the array to avoid direct manipulation
    };
  
    // Emit the updated question, including answers
    this.questionChanged.emit(question);
  }
}
