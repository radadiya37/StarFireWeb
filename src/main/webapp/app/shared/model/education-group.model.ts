export interface IEducationGroup {
  id?: number;
  name?: string;
  status?: boolean;
}

export const defaultValue: Readonly<IEducationGroup> = {
  status: false,
};
