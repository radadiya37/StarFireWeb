import { Moment } from 'moment';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeEmployment {
  id?: number;
  companyName?: string;
  address?: string;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
  lastSalary?: number;
  remarks?: string;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeEmployment> = {};
