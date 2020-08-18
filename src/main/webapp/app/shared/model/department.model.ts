export interface IDepartment {
  id?: number;
  name?: string;
  description?: string;
  code?: string;
  status?: boolean;
}

export const defaultValue: Readonly<IDepartment> = {
  status: false,
};
