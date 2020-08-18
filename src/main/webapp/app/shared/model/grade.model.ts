export interface IGrade {
  id?: number;
  name?: string;
  point?: number;
  serial?: number;
  description?: string;
}

export const defaultValue: Readonly<IGrade> = {};
