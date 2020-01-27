import { Group } from "./../../shared/entity.interface";

export class DialogData {
    group: Group | null;
    description: {
      title: string;
      action: string;
    }
  }