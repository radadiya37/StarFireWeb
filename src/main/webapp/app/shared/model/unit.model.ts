export interface IUnit {
  id?: number;
  name?: string;
  status?: boolean;
}

export const defaultValue: Readonly<IUnit> = {
  status: false,
};
