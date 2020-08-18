import { ITalentType } from 'app/shared/model/talent-type.model';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeTalent {
  id?: number;
  remarks?: string;
  talentType?: ITalentType;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeTalent> = {};
