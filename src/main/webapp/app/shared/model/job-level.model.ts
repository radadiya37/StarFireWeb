export interface IJobLevel {
  id?: number;
  name?: string;
  description?: string;
  code?: string;
  position?: number;
  status?: boolean;
}

export const defaultValue: Readonly<IJobLevel> = {
  status: false,
};
