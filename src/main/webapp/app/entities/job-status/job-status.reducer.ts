import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJobStatus, defaultValue } from 'app/shared/model/job-status.model';

export const ACTION_TYPES = {
  FETCH_JOBSTATUS_LIST: 'jobStatus/FETCH_JOBSTATUS_LIST',
  FETCH_JOBSTATUS: 'jobStatus/FETCH_JOBSTATUS',
  CREATE_JOBSTATUS: 'jobStatus/CREATE_JOBSTATUS',
  UPDATE_JOBSTATUS: 'jobStatus/UPDATE_JOBSTATUS',
  DELETE_JOBSTATUS: 'jobStatus/DELETE_JOBSTATUS',
  RESET: 'jobStatus/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJobStatus>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type JobStatusState = Readonly<typeof initialState>;

// Reducer

export default (state: JobStatusState = initialState, action): JobStatusState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JOBSTATUS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JOBSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_JOBSTATUS):
    case REQUEST(ACTION_TYPES.UPDATE_JOBSTATUS):
    case REQUEST(ACTION_TYPES.DELETE_JOBSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_JOBSTATUS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JOBSTATUS):
    case FAILURE(ACTION_TYPES.CREATE_JOBSTATUS):
    case FAILURE(ACTION_TYPES.UPDATE_JOBSTATUS):
    case FAILURE(ACTION_TYPES.DELETE_JOBSTATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBSTATUS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBSTATUS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_JOBSTATUS):
    case SUCCESS(ACTION_TYPES.UPDATE_JOBSTATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_JOBSTATUS):
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

const apiUrl = 'api/job-statuses';

// Actions

export const getEntities: ICrudGetAllAction<IJobStatus> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_JOBSTATUS_LIST,
    payload: axios.get<IJobStatus>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IJobStatus> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JOBSTATUS,
    payload: axios.get<IJobStatus>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IJobStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JOBSTATUS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJobStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JOBSTATUS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJobStatus> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JOBSTATUS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
