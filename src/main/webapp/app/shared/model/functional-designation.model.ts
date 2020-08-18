import { Moment } from 'moment';

export interface IFunctionalDesignation {
  id?: number;
  name?: string;
  code?: string;
  position?: number;
  shortName?: string;
  description?: string;
  designationDate?: string;
  status?: boolean;
}

export const defaultValue: Readonly<IFunctionalDesignation> = {
  status: false,
};
