export interface IEmploymentCategory {
  id?: number;
  name?: string;
  status?: boolean;
}

export const defaultValue: Readonly<IEmploymentCategory> = {
  status: false,
};
