import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { QuizService } from 'src/app/services/QuizService/quiz.service';
import { Question } from 'src/app/interfaces/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  testForm!: FormGroup;
  questionsArray: Question[] = [];

  constructor(private fb: FormBuilder, private quizService: QuizService) { }

  ngOnInit(): void {
    this.testForm = this.fb.group({
      name: ['', [Validators.required]],
      questions: this.fb.array([]),
    });
  }

  get questions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const newQuestion = this.fb.group({
      questionText: ['', [Validators.required]],
      answers: this.fb.array([]),
    });

    this.questions.push(newQuestion);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  saveTest(): void {
      const testFormData = {
        name: this.testForm.value.name,
        questions: this.questionsArray,
      }
      console.log('====================================');
      console.log(testFormData);
      console.log('====================================');
      
      // Add this line to update questionsArray
      this.questionsArray = testFormData.questions;

      this.quizService.createTest(testFormData).subscribe(
        (response) => {
          console.log('Test saved successfully:', response);
        },
        (error) => {
          console.error('Error saving test:', error);
        }
      );
  }
  updateQuestionsArray(question: Question): void {
    // Find the index of the question in the array
    const index = this.questionsArray.findIndex(q => q.question === question.question);
  
    // If the question is not in the array, add it
    if (index === -1) {
      this.questionsArray.push(question);
    } else {
      // If the question is already in the array, update it
      this.questionsArray[index] = question;
    }
  
    console.log('Updated Questions Array:', this.questionsArray);
  }
  
  
}
