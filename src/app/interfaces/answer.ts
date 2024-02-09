import { AnswerStatus } from "./AnswerStatus";

export interface Answer {
    id?: number;
    content: string | null;
    status: AnswerStatus | null;
  }