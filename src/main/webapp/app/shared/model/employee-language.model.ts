import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';
import { ILanguage } from 'app/shared/model/language.model';
import { ILanguageProficiency } from 'app/shared/model/language-proficiency.model';

export interface IEmployeeLanguage {
  id?: number;
  employee?: IEmployeeBasicInfo;
  language?: ILanguage;
  languageProficiency?: ILanguageProficiency;
}

export const defaultValue: Readonly<IEmployeeLanguage> = {};
