import { Plan } from "./Plan";

export interface Company {
  id?: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  image: string;
  plan: Plan;
}

