export interface IJobStatus {
  id?: number;
  code?: string;
  description?: string;
  status?: boolean;
}

export const defaultValue: Readonly<IJobStatus> = {
  status: false,
};
