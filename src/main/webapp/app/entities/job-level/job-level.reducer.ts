import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJobLevel, defaultValue } from 'app/shared/model/job-level.model';

export const ACTION_TYPES = {
  FETCH_JOBLEVEL_LIST: 'jobLevel/FETCH_JOBLEVEL_LIST',
  FETCH_JOBLEVEL: 'jobLevel/FETCH_JOBLEVEL',
  CREATE_JOBLEVEL: 'jobLevel/CREATE_JOBLEVEL',
  UPDATE_JOBLEVEL: 'jobLevel/UPDATE_JOBLEVEL',
  DELETE_JOBLEVEL: 'jobLevel/DELETE_JOBLEVEL',
  RESET: 'jobLevel/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJobLevel>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type JobLevelState = Readonly<typeof initialState>;

// Reducer

export default (state: JobLevelState = initialState, action): JobLevelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JOBLEVEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JOBLEVEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_JOBLEVEL):
    case REQUEST(ACTION_TYPES.UPDATE_JOBLEVEL):
    case REQUEST(ACTION_TYPES.DELETE_JOBLEVEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_JOBLEVEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JOBLEVEL):
    case FAILURE(ACTION_TYPES.CREATE_JOBLEVEL):
    case FAILURE(ACTION_TYPES.UPDATE_JOBLEVEL):
    case FAILURE(ACTION_TYPES.DELETE_JOBLEVEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBLEVEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBLEVEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_JOBLEVEL):
    case SUCCESS(ACTION_TYPES.UPDATE_JOBLEVEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_JOBLEVEL):
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

const apiUrl = 'api/job-levels';

// Actions

export const getEntities: ICrudGetAllAction<IJobLevel> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_JOBLEVEL_LIST,
    payload: axios.get<IJobLevel>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IJobLevel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JOBLEVEL,
    payload: axios.get<IJobLevel>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IJobLevel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JOBLEVEL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJobLevel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JOBLEVEL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJobLevel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JOBLEVEL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
