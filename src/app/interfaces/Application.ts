import { Applicant } from "./Applicant";
import { Job } from "./Job";
import { Status } from "./Status";

export interface Application {
  id?: number;
  date: Date;
  message: string;
  job: Job;
  applicant: Applicant;
  status: Status;
}
