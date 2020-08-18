export interface ICompanyBank {
  id?: number;
  name?: string;
  address?: string;
  routingCode?: string;
  accountName?: string;
  accountNo?: string;
}

export const defaultValue: Readonly<ICompanyBank> = {};
