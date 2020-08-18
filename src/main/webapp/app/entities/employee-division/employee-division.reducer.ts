import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeDivision, defaultValue } from 'app/shared/model/employee-division.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEDIVISION_LIST: 'employeeDivision/FETCH_EMPLOYEEDIVISION_LIST',
  FETCH_EMPLOYEEDIVISION: 'employeeDivision/FETCH_EMPLOYEEDIVISION',
  CREATE_EMPLOYEEDIVISION: 'employeeDivision/CREATE_EMPLOYEEDIVISION',
  UPDATE_EMPLOYEEDIVISION: 'employeeDivision/UPDATE_EMPLOYEEDIVISION',
  DELETE_EMPLOYEEDIVISION: 'employeeDivision/DELETE_EMPLOYEEDIVISION',
  RESET: 'employeeDivision/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeDivision>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeDivisionState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeDivisionState = initialState, action): EmployeeDivisionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEDIVISION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEDIVISION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEDIVISION):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEDIVISION):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEDIVISION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEDIVISION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEDIVISION):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEDIVISION):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEDIVISION):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEDIVISION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEDIVISION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEDIVISION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEDIVISION):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEDIVISION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEDIVISION):
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

const apiUrl = 'api/employee-divisions';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeDivision> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEDIVISION_LIST,
  payload: axios.get<IEmployeeDivision>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeDivision> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEDIVISION,
    payload: axios.get<IEmployeeDivision>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeDivision> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEDIVISION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeDivision> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEDIVISION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeDivision> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEDIVISION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
