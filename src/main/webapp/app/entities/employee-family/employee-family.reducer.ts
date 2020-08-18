import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeFamily, defaultValue } from 'app/shared/model/employee-family.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEFAMILY_LIST: 'employeeFamily/FETCH_EMPLOYEEFAMILY_LIST',
  FETCH_EMPLOYEEFAMILY: 'employeeFamily/FETCH_EMPLOYEEFAMILY',
  CREATE_EMPLOYEEFAMILY: 'employeeFamily/CREATE_EMPLOYEEFAMILY',
  UPDATE_EMPLOYEEFAMILY: 'employeeFamily/UPDATE_EMPLOYEEFAMILY',
  DELETE_EMPLOYEEFAMILY: 'employeeFamily/DELETE_EMPLOYEEFAMILY',
  RESET: 'employeeFamily/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeFamily>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeFamilyState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeFamilyState = initialState, action): EmployeeFamilyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEFAMILY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEFAMILY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEFAMILY):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEFAMILY):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEFAMILY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEFAMILY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEFAMILY):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEFAMILY):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEFAMILY):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEFAMILY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEFAMILY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEFAMILY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEFAMILY):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEFAMILY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEFAMILY):
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

const apiUrl = 'api/employee-families';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeFamily> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEFAMILY_LIST,
  payload: axios.get<IEmployeeFamily>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeFamily> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEFAMILY,
    payload: axios.get<IEmployeeFamily>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeFamily> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEFAMILY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeFamily> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEFAMILY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeFamily> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEFAMILY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
