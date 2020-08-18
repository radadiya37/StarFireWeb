import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeEmployment, defaultValue } from 'app/shared/model/employee-employment.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEEMPLOYMENT_LIST: 'employeeEmployment/FETCH_EMPLOYEEEMPLOYMENT_LIST',
  FETCH_EMPLOYEEEMPLOYMENT: 'employeeEmployment/FETCH_EMPLOYEEEMPLOYMENT',
  CREATE_EMPLOYEEEMPLOYMENT: 'employeeEmployment/CREATE_EMPLOYEEEMPLOYMENT',
  UPDATE_EMPLOYEEEMPLOYMENT: 'employeeEmployment/UPDATE_EMPLOYEEEMPLOYMENT',
  DELETE_EMPLOYEEEMPLOYMENT: 'employeeEmployment/DELETE_EMPLOYEEEMPLOYMENT',
  RESET: 'employeeEmployment/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeEmployment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeEmploymentState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeEmploymentState = initialState, action): EmployeeEmploymentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEEMPLOYMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEEMPLOYMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEEMPLOYMENT):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEEMPLOYMENT):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEEMPLOYMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEEMPLOYMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEEMPLOYMENT):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEEMPLOYMENT):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEEMPLOYMENT):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEEMPLOYMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEEMPLOYMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEEMPLOYMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEEMPLOYMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEEMPLOYMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEEMPLOYMENT):
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

const apiUrl = 'api/employee-employments';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeEmployment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEEMPLOYMENT_LIST,
  payload: axios.get<IEmployeeEmployment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeEmployment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEEMPLOYMENT,
    payload: axios.get<IEmployeeEmployment>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeEmployment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEEMPLOYMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeEmployment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEEMPLOYMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeEmployment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEEMPLOYMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
