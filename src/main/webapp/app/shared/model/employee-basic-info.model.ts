import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IReligion } from 'app/shared/model/religion.model';
import { IMaritalStatus } from 'app/shared/model/marital-status.model';
import { IBloodGroup } from 'app/shared/model/blood-group.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { Month } from 'app/shared/model/enumerations/month.model';

export interface IEmployeeBasicInfo {
  id?: number;
  code?: string;
  dob?: string;
  personalEmail?: string;
  phone?: string;
  telephone?: string;
  nationality?: string;
  photoPath?: string;
  status?: boolean;
  gender?: Gender;
  joinDate?: string;
  reviewMonth?: Month;
  user?: IUser;
  religion?: IReligion;
  maritalStatus?: IMaritalStatus;
  bloodGroup?: IBloodGroup;
}

export const defaultValue: Readonly<IEmployeeBasicInfo> = {
  status: false,
};
