import { IEducationGroup } from 'app/shared/model/education-group.model';

export interface IEducation {
  id?: number;
  name?: string;
  description?: string;
  status?: boolean;
  educationGroup?: IEducationGroup;
}

export const defaultValue: Readonly<IEducation> = {
  status: false,
};
