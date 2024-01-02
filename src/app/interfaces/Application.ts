import { Applicant } from "./Applicant";
import { Job } from "./Job";

export interface Application {
  id?: number;
  date: Date;
  message: string;
  job: Job;
  applicant: Applicant;
}
