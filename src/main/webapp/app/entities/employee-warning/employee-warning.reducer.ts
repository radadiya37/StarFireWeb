import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeWarning, defaultValue } from 'app/shared/model/employee-warning.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEWARNING_LIST: 'employeeWarning/FETCH_EMPLOYEEWARNING_LIST',
  FETCH_EMPLOYEEWARNING: 'employeeWarning/FETCH_EMPLOYEEWARNING',
  CREATE_EMPLOYEEWARNING: 'employeeWarning/CREATE_EMPLOYEEWARNING',
  UPDATE_EMPLOYEEWARNING: 'employeeWarning/UPDATE_EMPLOYEEWARNING',
  DELETE_EMPLOYEEWARNING: 'employeeWarning/DELETE_EMPLOYEEWARNING',
  RESET: 'employeeWarning/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeWarning>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeWarningState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeWarningState = initialState, action): EmployeeWarningState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEWARNING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEWARNING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEWARNING):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEWARNING):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEWARNING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEWARNING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEWARNING):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEWARNING):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEWARNING):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEWARNING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEWARNING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEWARNING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEWARNING):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEWARNING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEWARNING):
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

const apiUrl = 'api/employee-warnings';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeWarning> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEWARNING_LIST,
  payload: axios.get<IEmployeeWarning>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeWarning> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEWARNING,
    payload: axios.get<IEmployeeWarning>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeWarning> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEWARNING,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeWarning> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEWARNING,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeWarning> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEWARNING,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
