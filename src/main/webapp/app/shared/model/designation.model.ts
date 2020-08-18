import { Moment } from 'moment';
import { IDesignationGroup } from 'app/shared/model/designation-group.model';

export interface IDesignation {
  id?: number;
  name?: string;
  shortName?: string;
  code?: string;
  description?: string;
  position?: number;
  designationDate?: string;
  status?: boolean;
  designationGroup?: IDesignationGroup;
}

export const defaultValue: Readonly<IDesignation> = {
  status: false,
};
