import { IDocumentCategory } from 'app/shared/model/document-category.model';
import { IEmployeeBasicInfo } from 'app/shared/model/employee-basic-info.model';

export interface IEmployeeDocument {
  id?: number;
  documentTitle?: string;
  documentPath?: string;
  remarks?: string;
  documentCategory?: IDocumentCategory;
  employee?: IEmployeeBasicInfo;
}

export const defaultValue: Readonly<IEmployeeDocument> = {};
