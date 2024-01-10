import { State } from "./State";

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
}
