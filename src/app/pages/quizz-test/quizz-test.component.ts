import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from '../../interfaces/test';
import { QuizService } from '../../services/QuizService/quiz.service';
import { Applicant } from 'src/app/interfaces/Applicant';
import { AnswerStatus } from 'src/app/interfaces/AnswerStatus';
import { trigger, state, style, transition, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quizz-test',
  templateUrl: './quizz-test.component.html',
  styleUrls: ['./quizz-test.component.css'],
  animations: [
    trigger('fade', [
      state('red', style({ color: 'black' })),
      state('red', style({ color: 'red' })),
      transition('normal <=> red', animate('300ms ease-in-out')),
    ]),
    trigger('barWidth', [
      state('red', style({ width: '100%' })),
      state('normal', style({ width: '10%', backgroundColor: 'red' })),
      transition('red <=> normal', animate('300ms ease-in-out')),
    ]),
  ],
})
export class QuizzTestComponent implements OnInit, OnDestroy {
  testId!: number;
  test!: Test;
  applicant!: Applicant;
  currentQuestionIndex = 0;
  userAnswers: Map<number, number> = new Map();
  quizCompleted = false;
  remainingTime = 30;
  intervalId: any;
  barState = 'red';

  constructor(private route: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.testId = +params['testId'];
    });
    this.getTest();
    this.startTimer();
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  }

  getTest() {
    this.quizService.getTestById(this.testId).subscribe(
      (test) => {
        this.test = test;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.updateBarState();
      } else {
        this.quizCompleted = true;
        this.submitTest();
        clearInterval(this.intervalId); // Clear the interval
      }
    }, 1000);
  }

  selectAnswer(answerIndex: number): void {
    if (!this.quizCompleted) {
      this.userAnswers.set(this.currentQuestionIndex, answerIndex);
    }
  }

  nextQuestion(): void {
    if (!this.quizCompleted) {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex === this.test.questions.length) {
        this.quizCompleted = true;
        this.submitTest();
        clearInterval(this.intervalId); // Clear the interval
      }
    }
  }

  evaluateTest(): boolean {
    let correctAnswers = 0;

    this.userAnswers.forEach((answerIndex, questionIndex) => {
      const question = this.test.questions[questionIndex];
      const selectedAnswer = question.answers[answerIndex];

      if (selectedAnswer.status === AnswerStatus.RIGHT) {
        correctAnswers++;
      }
    });

    const passingGrade = 0.7; // Adjust this value based on your passing criteria
    const userScore = correctAnswers / this.test.questions.length;

    return userScore >= passingGrade;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  updateBarState(): void {
    // Adjust this threshold as needed
    this.barState = this.remainingTime <= 10 ? 'red' : 'red';
  }

  submitTest(): void {
    const passed = this.evaluateTest();

    if (passed) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'You passed the test!',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Unfortunately',
        text: 'You did not pass the test',
      });
    }
  }
}
