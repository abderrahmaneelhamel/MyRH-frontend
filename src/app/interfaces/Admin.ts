import { State } from "./State";

export interface Admin {
  id?: number;
  name: string;
  email: string;
  password: string;
  state: State;
}
