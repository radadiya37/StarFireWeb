import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeSupervisor, defaultValue } from 'app/shared/model/employee-supervisor.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEESUPERVISOR_LIST: 'employeeSupervisor/FETCH_EMPLOYEESUPERVISOR_LIST',
  FETCH_EMPLOYEESUPERVISOR: 'employeeSupervisor/FETCH_EMPLOYEESUPERVISOR',
  CREATE_EMPLOYEESUPERVISOR: 'employeeSupervisor/CREATE_EMPLOYEESUPERVISOR',
  UPDATE_EMPLOYEESUPERVISOR: 'employeeSupervisor/UPDATE_EMPLOYEESUPERVISOR',
  DELETE_EMPLOYEESUPERVISOR: 'employeeSupervisor/DELETE_EMPLOYEESUPERVISOR',
  RESET: 'employeeSupervisor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeSupervisor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeSupervisorState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeSupervisorState = initialState, action): EmployeeSupervisorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEESUPERVISOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEESUPERVISOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEESUPERVISOR):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEESUPERVISOR):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEESUPERVISOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEESUPERVISOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEESUPERVISOR):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEESUPERVISOR):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEESUPERVISOR):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEESUPERVISOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEESUPERVISOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEESUPERVISOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEESUPERVISOR):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEESUPERVISOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEESUPERVISOR):
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

const apiUrl = 'api/employee-supervisors';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeSupervisor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEESUPERVISOR_LIST,
  payload: axios.get<IEmployeeSupervisor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeSupervisor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEESUPERVISOR,
    payload: axios.get<IEmployeeSupervisor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeSupervisor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEESUPERVISOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeSupervisor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEESUPERVISOR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeSupervisor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEESUPERVISOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
