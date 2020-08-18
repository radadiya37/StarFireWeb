import { IEducation } from 'app/shared/model/education.model';
import { IGrade } from 'app/shared/model/grade.model';
import { IEducationInstitute } from 'app/shared/model/education-institute.model';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeEducation {
  id?: number;
  passedYear?: number;
  cgpa?: number;
  scale?: number;
  hasForeignDegree?: boolean;
  isProfessional?: boolean;
  isLastEducation?: boolean;
  education?: IEducation;
  grade?: IGrade;
  institute?: IEducationInstitute;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeEducation> = {
  hasForeignDegree: false,
  isProfessional: false,
  isLastEducation: false,
};
