import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeJobStatus, defaultValue } from 'app/shared/model/employee-job-status.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEJOBSTATUS_LIST: 'employeeJobStatus/FETCH_EMPLOYEEJOBSTATUS_LIST',
  FETCH_EMPLOYEEJOBSTATUS: 'employeeJobStatus/FETCH_EMPLOYEEJOBSTATUS',
  CREATE_EMPLOYEEJOBSTATUS: 'employeeJobStatus/CREATE_EMPLOYEEJOBSTATUS',
  UPDATE_EMPLOYEEJOBSTATUS: 'employeeJobStatus/UPDATE_EMPLOYEEJOBSTATUS',
  DELETE_EMPLOYEEJOBSTATUS: 'employeeJobStatus/DELETE_EMPLOYEEJOBSTATUS',
  RESET: 'employeeJobStatus/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeJobStatus>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeJobStatusState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeJobStatusState = initialState, action): EmployeeJobStatusState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEJOBSTATUS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEJOBSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEJOBSTATUS):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEJOBSTATUS):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEJOBSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEJOBSTATUS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEJOBSTATUS):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEJOBSTATUS):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEJOBSTATUS):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEJOBSTATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEJOBSTATUS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEJOBSTATUS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEJOBSTATUS):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEJOBSTATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEJOBSTATUS):
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

const apiUrl = 'api/employee-job-statuses';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeJobStatus> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEJOBSTATUS_LIST,
  payload: axios.get<IEmployeeJobStatus>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeJobStatus> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEJOBSTATUS,
    payload: axios.get<IEmployeeJobStatus>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeJobStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEJOBSTATUS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeJobStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEJOBSTATUS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeJobStatus> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEJOBSTATUS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
