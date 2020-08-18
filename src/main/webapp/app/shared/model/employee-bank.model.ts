import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeBank {
  id?: number;
  name?: string;
  routingCode?: string;
  accountNo?: string;
  accountName?: string;
  remarks?: string;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeBank> = {};
