import { Component, Input } from '@angular/core';
import { Test } from 'src/app/interfaces/test';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.css']
})
export class TestCardComponent {
  @Input() test!: Test;

  constructor() {}
}
