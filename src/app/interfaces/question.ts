import { Answer } from "./answer";

export interface Question {
    id?: number;
    question: string | null;
    answers: Answer[] | unknown;
  }