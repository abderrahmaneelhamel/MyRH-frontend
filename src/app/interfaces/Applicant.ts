import { State } from "./State";
import { ApplicantTest } from "./applicant-test";
import { Badge } from "./badge";

export interface Applicant {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  level: string;
  profile: string;
  city: string;
  cv: string;
  state: State;
  badges?: Badge[];
  applicantTests?: ApplicantTest[];
}
