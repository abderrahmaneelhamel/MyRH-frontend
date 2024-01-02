import { Company } from "./Company";
import { Status } from "../interfaces/Status";

export interface Job {
  id?: number;
  title: string;
  description: string;
  level: string;
  salary: number;
  profile: string;
  city: string;
  company: Company;
  status: Status;
}