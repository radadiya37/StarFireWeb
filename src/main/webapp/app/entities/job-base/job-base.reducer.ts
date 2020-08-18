import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJobBase, defaultValue } from 'app/shared/model/job-base.model';

export const ACTION_TYPES = {
  FETCH_JOBBASE_LIST: 'jobBase/FETCH_JOBBASE_LIST',
  FETCH_JOBBASE: 'jobBase/FETCH_JOBBASE',
  CREATE_JOBBASE: 'jobBase/CREATE_JOBBASE',
  UPDATE_JOBBASE: 'jobBase/UPDATE_JOBBASE',
  DELETE_JOBBASE: 'jobBase/DELETE_JOBBASE',
  RESET: 'jobBase/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJobBase>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type JobBaseState = Readonly<typeof initialState>;

// Reducer

export default (state: JobBaseState = initialState, action): JobBaseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JOBBASE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JOBBASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_JOBBASE):
    case REQUEST(ACTION_TYPES.UPDATE_JOBBASE):
    case REQUEST(ACTION_TYPES.DELETE_JOBBASE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_JOBBASE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JOBBASE):
    case FAILURE(ACTION_TYPES.CREATE_JOBBASE):
    case FAILURE(ACTION_TYPES.UPDATE_JOBBASE):
    case FAILURE(ACTION_TYPES.DELETE_JOBBASE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBBASE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOBBASE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_JOBBASE):
    case SUCCESS(ACTION_TYPES.UPDATE_JOBBASE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_JOBBASE):
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

const apiUrl = 'api/job-bases';

// Actions

export const getEntities: ICrudGetAllAction<IJobBase> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_JOBBASE_LIST,
    payload: axios.get<IJobBase>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IJobBase> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JOBBASE,
    payload: axios.get<IJobBase>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IJobBase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JOBBASE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJobBase> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JOBBASE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJobBase> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JOBBASE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
