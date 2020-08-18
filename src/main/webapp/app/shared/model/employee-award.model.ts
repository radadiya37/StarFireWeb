import { Moment } from 'moment';
import { IAwardType } from 'app/shared/model/award-type.model';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeAward {
  id?: number;
  awardDate?: string;
  awardName?: string;
  gift?: string;
  prizeAmount?: number;
  awardCertificatePath?: string;
  remarks?: string;
  awardType?: IAwardType;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeAward> = {};
