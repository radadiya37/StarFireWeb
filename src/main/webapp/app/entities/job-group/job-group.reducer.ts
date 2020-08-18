import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJobGroup, defaultValue } from 'app/shared/model/job-group.model';

export const ACTION_TYPES = {
  FETCH_JOBGROUP_LIST: 'jobGroup/FETCH_JOBGROUP_LIST',
  FETCH_JOBGROUP: 'jobGroup/FETCH_JOBGROUP',
  CREATE_JOBGROUP: 'jobGroup/CREATE_JOBGROUP',
  UPDATE_JOBGROUP: 'jobGroup/UPDATE_JOBGROUP',
  DELETE_JOBGROUP: 'jobGroup/DELETE_JOBGROUP',
  RESET: 'jobGroup/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJobGroup>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type JobGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: JobGroupState = initialState, action): JobGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JOBGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JOBGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_JOBGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_JOBGROUP):
    case REQUEST(ACTION_TYPES.DELETE_JOBGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_JOBGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JOBGROUP):
    case FAILURE(ACTION_TYPES.CREATE_JOBGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_JOBGROUP):
    case FAILURE(ACTION_TYPES.DELETE_JOBGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_JOBGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_JOBGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_JOBGROUP):
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

const apiUrl = 'api/job-groups';

// Actions

export const getEntities: ICrudGetAllAction<IJobGroup> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_JOBGROUP_LIST,
    payload: axios.get<IJobGroup>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IJobGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JOBGROUP,
    payload: axios.get<IJobGroup>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IJobGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JOBGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJobGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JOBGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJobGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JOBGROUP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
