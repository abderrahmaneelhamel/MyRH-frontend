import { Applicant } from "./Applicant";
import { Test } from "./test";

export interface ApplicantTest {
    id: number;
    applicant: Applicant;
    test: Test;
    attempts: number;
    passed: boolean;
  }