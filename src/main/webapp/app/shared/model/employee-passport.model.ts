import { Moment } from 'moment';
import { ICountry } from 'app/shared/model/country.model';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeePassport {
  id?: number;
  passportType?: string;
  passportNo?: string;
  issueDate?: string;
  expireDate?: string;
  country?: ICountry;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeePassport> = {};
