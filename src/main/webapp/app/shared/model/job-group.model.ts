export interface IJobGroup {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  status?: boolean;
}

export const defaultValue: Readonly<IJobGroup> = {
  status: false,
};
