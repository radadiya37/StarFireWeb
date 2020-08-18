export interface IDesignationGroup {
  id?: number;
  name?: string;
  status?: boolean;
}

export const defaultValue: Readonly<IDesignationGroup> = {
  status: false,
};
