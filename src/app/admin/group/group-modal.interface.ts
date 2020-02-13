import { Group, Speciality, Faculty} from './../../shared/entity.interface';

export class DialogData {
  group: Group | null;
  listSpeciality: Speciality[] | null;
  listFaculty: Faculty[] | null;
  description: {
    title: string;
    action: string;
  }
}
