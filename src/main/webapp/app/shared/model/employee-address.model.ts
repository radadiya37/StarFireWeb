import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { IAddress } from 'app/shared/model/address.model';

export interface IEmployeeAddress {
  id?: number;
  employee?: IEmployeeBasicInfo;
  presentAddress?: IAddress;
  permanentAddress?: IAddress;
}

export const defaultValue: Readonly<IEmployeeAddress> = {};
