import { IState } from 'app/shared/model/state.model';
import { ICountry } from 'app/shared/model/country.model';

export interface ICity {
  id?: number;
  name?: string;
  state?: IState;
  country?: ICountry;
}

export const defaultValue: Readonly<ICity> = {};
