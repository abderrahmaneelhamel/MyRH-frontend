import {Component, OnInit} from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import {Job} from "../../interfaces/Job";
import {Status} from "../../interfaces/Status";
import {JobService} from "../../services/JobService/job.service";
import {CompanyService} from "../../services/CompanyService/company.service";
import {Router} from "@angular/router";
import {QuizService} from "../../services/QuizService/quiz.service";
import {Test} from "../../interfaces/test";
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  tests: Test[] = [];
  constructor(private quizService: QuizService,private router: Router) {}

  ngOnInit(): void {
    this.loadTests();
  }
  loadTests() {
    this.quizService.getAllTest().subscribe(
      (data: Test[]) => {
        this.tests = data;
      },
      error => {
        console.error('Error loading tests:', error);
      }
    );
  }
}
