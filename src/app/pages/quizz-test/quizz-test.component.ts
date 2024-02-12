import {Component, OnInit} from '@angular/core';
import {Applicant} from "../../interfaces/Applicant";
import {ActivatedRoute} from "@angular/router";
import {Test} from "../../interfaces/test";
import {QuizService} from "../../services/QuizService/quiz.service";

@Component({
  selector: 'app-quizz-test',
  templateUrl: './quizz-test.component.html',
  styleUrls: ['./quizz-test.component.css']
})
export class QuizzTestComponent implements OnInit {
  testId!: number;
  test!: Test;
  applicant!: Applicant;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.testId = +params['testId'];
    });
    this.getTest();
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

}
