export interface IJobBase {
  id?: number;
  name?: string;
  code?: string;
  isSystemReserved?: boolean;
}

export const defaultValue: Readonly<IJobBase> = {
  isSystemReserved: false,
};
