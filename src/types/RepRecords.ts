import { Exercise } from "./Exercise";

export interface RepRecords {
  userId: string;
  records: {
    [key in Exercise]: {
      [key: number]: number;
    };
  };
}
