import { Moment } from 'moment';
import { IDivision } from 'app/shared/model/division.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IBranch } from 'app/shared/model/branch.model';
import { IUnit } from 'app/shared/model/unit.model';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeDivision {
  id?: number;
  effectiveDate?: string;
  division?: IDivision;
  department?: IDepartment;
  branch?: IBranch;
  unit?: IUnit;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeDivision> = {};
