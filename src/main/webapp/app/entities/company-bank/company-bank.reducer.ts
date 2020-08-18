import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompanyBank, defaultValue } from 'app/shared/model/company-bank.model';

export const ACTION_TYPES = {
  FETCH_COMPANYBANK_LIST: 'companyBank/FETCH_COMPANYBANK_LIST',
  FETCH_COMPANYBANK: 'companyBank/FETCH_COMPANYBANK',
  CREATE_COMPANYBANK: 'companyBank/CREATE_COMPANYBANK',
  UPDATE_COMPANYBANK: 'companyBank/UPDATE_COMPANYBANK',
  DELETE_COMPANYBANK: 'companyBank/DELETE_COMPANYBANK',
  RESET: 'companyBank/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompanyBank>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CompanyBankState = Readonly<typeof initialState>;

// Reducer

export default (state: CompanyBankState = initialState, action): CompanyBankState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPANYBANK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPANYBANK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPANYBANK):
    case REQUEST(ACTION_TYPES.UPDATE_COMPANYBANK):
    case REQUEST(ACTION_TYPES.DELETE_COMPANYBANK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPANYBANK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPANYBANK):
    case FAILURE(ACTION_TYPES.CREATE_COMPANYBANK):
    case FAILURE(ACTION_TYPES.UPDATE_COMPANYBANK):
    case FAILURE(ACTION_TYPES.DELETE_COMPANYBANK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANYBANK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANYBANK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPANYBANK):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPANYBANK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPANYBANK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/company-banks';

// Actions

export const getEntities: ICrudGetAllAction<ICompanyBank> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPANYBANK_LIST,
  payload: axios.get<ICompanyBank>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICompanyBank> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPANYBANK,
    payload: axios.get<ICompanyBank>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICompanyBank> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPANYBANK,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompanyBank> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPANYBANK,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompanyBank> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPANYBANK,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
