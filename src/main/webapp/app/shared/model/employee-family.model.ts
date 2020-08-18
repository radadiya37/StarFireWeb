import { Moment } from 'moment';
import { IPersonalRelationship } from 'app/shared/model/personal-relationship.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IEmployeeFamily {
  id?: number;
  name?: string;
  dob?: string;
  nid?: string;
  phone?: string;
  profession?: string;
  gender?: Gender;
  employeeRelationship?: IPersonalRelationship;
}

export const defaultValue: Readonly<IEmployeeFamily> = {};
