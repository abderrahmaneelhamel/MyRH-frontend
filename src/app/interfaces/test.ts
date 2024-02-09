import { Applicant } from "./Applicant";
import { Question } from "./question";

export interface Test {
    id: number;
    name: string;
    questions: Question[];
    applicants: Applicant[];
  }