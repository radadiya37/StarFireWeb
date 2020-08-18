import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeAward, defaultValue } from 'app/shared/model/employee-award.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEAWARD_LIST: 'employeeAward/FETCH_EMPLOYEEAWARD_LIST',
  FETCH_EMPLOYEEAWARD: 'employeeAward/FETCH_EMPLOYEEAWARD',
  CREATE_EMPLOYEEAWARD: 'employeeAward/CREATE_EMPLOYEEAWARD',
  UPDATE_EMPLOYEEAWARD: 'employeeAward/UPDATE_EMPLOYEEAWARD',
  DELETE_EMPLOYEEAWARD: 'employeeAward/DELETE_EMPLOYEEAWARD',
  RESET: 'employeeAward/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeAward>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type EmployeeAwardState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeAwardState = initialState, action): EmployeeAwardState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEAWARD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEAWARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEAWARD):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEAWARD):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEAWARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEAWARD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEAWARD):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEAWARD):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEAWARD):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEAWARD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEAWARD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEAWARD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEAWARD):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEAWARD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEAWARD):
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

const apiUrl = 'api/employee-awards';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeAward> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEAWARD_LIST,
    payload: axios.get<IEmployeeAward>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEmployeeAward> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEAWARD,
    payload: axios.get<IEmployeeAward>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeAward> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEAWARD,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeAward> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEAWARD,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeAward> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEAWARD,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
