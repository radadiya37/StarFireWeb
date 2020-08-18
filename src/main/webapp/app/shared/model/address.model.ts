import { ICity } from 'app/shared/model/city.model';
import { IState } from 'app/shared/model/state.model';
import { ICountry } from 'app/shared/model/country.model';

export interface IAddress {
  id?: number;
  address?: string;
  zipCode?: string;
  city?: ICity;
  state?: IState;
  country?: ICountry;
}

export const defaultValue: Readonly<IAddress> = {};
