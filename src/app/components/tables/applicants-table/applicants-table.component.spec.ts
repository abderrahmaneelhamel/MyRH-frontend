import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsTableComponent } from './applicants-table.component';

describe('ApplicantsTableComponent', () => {
  let component: ApplicantsTableComponent;
  let fixture: ComponentFixture<ApplicantsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
