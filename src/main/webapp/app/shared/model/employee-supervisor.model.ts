import { Moment } from 'moment';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeSupervisor {
  id?: number;
  isDirectSupervisor?: boolean;
  effectiveDate?: string;
  employee?: IEmployeeBasicInfo;
  supervisor?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeSupervisor> = {
  isDirectSupervisor: false,
};
