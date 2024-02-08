import { Plan } from "./Plan";
import { State } from "./State";

export interface Company {
  id?: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  image: string;
  plan?: Plan;
  state: State;
}

