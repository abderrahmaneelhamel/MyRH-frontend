import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzTestComponent } from './quizz-test.component';

describe('QuizzTestComponent', () => {
  let component: QuizzTestComponent;
  let fixture: ComponentFixture<QuizzTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
