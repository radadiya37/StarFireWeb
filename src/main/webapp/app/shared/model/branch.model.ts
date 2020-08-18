import { ITimeZone } from 'app/shared/model/time-zone.model';

export interface IBranch {
  id?: number;
  name?: string;
  isRemoteAttendanceAllowed?: boolean;
  radiusInMeter?: number;
  isHeadOffice?: boolean;
  timeZone?: ITimeZone;
}

export const defaultValue: Readonly<IBranch> = {
  isRemoteAttendanceAllowed: false,
  isHeadOffice: false,
};
