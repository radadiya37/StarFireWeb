import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeLanguage, defaultValue } from 'app/shared/model/employee-language.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEELANGUAGE_LIST: 'employeeLanguage/FETCH_EMPLOYEELANGUAGE_LIST',
  FETCH_EMPLOYEELANGUAGE: 'employeeLanguage/FETCH_EMPLOYEELANGUAGE',
  CREATE_EMPLOYEELANGUAGE: 'employeeLanguage/CREATE_EMPLOYEELANGUAGE',
  UPDATE_EMPLOYEELANGUAGE: 'employeeLanguage/UPDATE_EMPLOYEELANGUAGE',
  DELETE_EMPLOYEELANGUAGE: 'employeeLanguage/DELETE_EMPLOYEELANGUAGE',
  RESET: 'employeeLanguage/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeLanguage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeLanguageState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeLanguageState = initialState, action): EmployeeLanguageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEELANGUAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEELANGUAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEELANGUAGE):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEELANGUAGE):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEELANGUAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEELANGUAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEELANGUAGE):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEELANGUAGE):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEELANGUAGE):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEELANGUAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEELANGUAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEELANGUAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEELANGUAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEELANGUAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEELANGUAGE):
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

const apiUrl = 'api/employee-languages';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeLanguage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEELANGUAGE_LIST,
  payload: axios.get<IEmployeeLanguage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeLanguage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEELANGUAGE,
    payload: axios.get<IEmployeeLanguage>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeLanguage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEELANGUAGE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeLanguage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEELANGUAGE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeLanguage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEELANGUAGE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
