import { Applicant } from "./Applicant";
import { Badge } from "./badge";
import { Question } from "./question";

export interface Test {
    id: number;
    name: string;
    questions: Question[];
    applicants: Applicant[];
    badge: Badge;
}