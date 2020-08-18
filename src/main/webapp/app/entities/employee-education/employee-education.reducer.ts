import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeEducation, defaultValue } from 'app/shared/model/employee-education.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEEDUCATION_LIST: 'employeeEducation/FETCH_EMPLOYEEEDUCATION_LIST',
  FETCH_EMPLOYEEEDUCATION: 'employeeEducation/FETCH_EMPLOYEEEDUCATION',
  CREATE_EMPLOYEEEDUCATION: 'employeeEducation/CREATE_EMPLOYEEEDUCATION',
  UPDATE_EMPLOYEEEDUCATION: 'employeeEducation/UPDATE_EMPLOYEEEDUCATION',
  DELETE_EMPLOYEEEDUCATION: 'employeeEducation/DELETE_EMPLOYEEEDUCATION',
  RESET: 'employeeEducation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeEducation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeEducationState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeEducationState = initialState, action): EmployeeEducationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEEDUCATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEEDUCATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEEDUCATION):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEEDUCATION):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEEDUCATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEEDUCATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEEDUCATION):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEEDUCATION):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEEDUCATION):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEEDUCATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEEDUCATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEEDUCATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEEDUCATION):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEEDUCATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEEDUCATION):
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

const apiUrl = 'api/employee-educations';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeEducation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEEDUCATION_LIST,
  payload: axios.get<IEmployeeEducation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeEducation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEEDUCATION,
    payload: axios.get<IEmployeeEducation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeEducation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEEDUCATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeEducation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEEDUCATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeEducation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEEDUCATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
