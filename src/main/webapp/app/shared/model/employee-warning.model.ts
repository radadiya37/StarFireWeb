import { Moment } from 'moment';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { IWarningType } from 'app/shared/model/warning-type.model';

export interface IEmployeeWarning {
  id?: number;
  warning?: string;
  action?: string;
  remarks?: string;
  isActionType?: boolean;
  warningDate?: string;
  warnedEmployee?: IEmployeeBasicInfo;
  warnedBy?: IEmployeeBasicInfo;
  warningType?: IWarningType;
}

export const defaultValue: Readonly<IEmployeeWarning> = {
  isActionType: false,
};
