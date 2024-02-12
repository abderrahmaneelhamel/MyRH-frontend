import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/interfaces/test';
import { QuizService } from 'src/app/services/QuizService/quiz.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  tests: Test[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.quizService.getAllTest().subscribe((tests: Test[]) => {
      this.tests = tests;
    });
  }

  applyForTest(test: Test): void {
    // Handle applying for the selected test
    console.log('Applying for test:', test);
  }
}
