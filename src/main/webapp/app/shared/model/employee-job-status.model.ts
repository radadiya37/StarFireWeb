import { Moment } from 'moment';
import { IJobStatus } from 'app/shared/model/job-status.model';
import { IJobBase } from 'app/shared/model/job-base.model';
import { IEmploymentCategory } from 'app/shared/model/employment-category.model';
import { IDesignation } from 'app/shared/model/designation.model';
import { IJobLevel } from 'app/shared/model/job-level.model';
import { IFunctionalDesignation } from 'app/shared/model/functional-designation.model';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeJobStatus {
  id?: number;
  jobStatusEfDate?: string;
  jobBaseEfDate?: string;
  employmentCatEfDate?: string;
  designationEfDate?: string;
  jobLevelEfDate?: string;
  functionalDesignationEfDate?: string;
  jobStatus?: IJobStatus;
  jobBase?: IJobBase;
  employmentCategory?: IEmploymentCategory;
  designation?: IDesignation;
  jobLevel?: IJobLevel;
  functionalDesignation?: IFunctionalDesignation;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeJobStatus> = {};
