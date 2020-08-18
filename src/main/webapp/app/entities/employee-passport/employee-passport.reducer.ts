import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeePassport, defaultValue } from 'app/shared/model/employee-passport.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEPASSPORT_LIST: 'employeePassport/FETCH_EMPLOYEEPASSPORT_LIST',
  FETCH_EMPLOYEEPASSPORT: 'employeePassport/FETCH_EMPLOYEEPASSPORT',
  CREATE_EMPLOYEEPASSPORT: 'employeePassport/CREATE_EMPLOYEEPASSPORT',
  UPDATE_EMPLOYEEPASSPORT: 'employeePassport/UPDATE_EMPLOYEEPASSPORT',
  DELETE_EMPLOYEEPASSPORT: 'employeePassport/DELETE_EMPLOYEEPASSPORT',
  RESET: 'employeePassport/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeePassport>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeePassportState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeePassportState = initialState, action): EmployeePassportState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEPASSPORT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEPASSPORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEPASSPORT):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEPASSPORT):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEPASSPORT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEPASSPORT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEPASSPORT):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEPASSPORT):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEPASSPORT):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEPASSPORT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEPASSPORT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEPASSPORT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEPASSPORT):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEPASSPORT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEPASSPORT):
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

const apiUrl = 'api/employee-passports';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeePassport> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEPASSPORT_LIST,
  payload: axios.get<IEmployeePassport>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeePassport> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEPASSPORT,
    payload: axios.get<IEmployeePassport>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeePassport> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEPASSPORT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeePassport> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEPASSPORT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeePassport> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEPASSPORT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
