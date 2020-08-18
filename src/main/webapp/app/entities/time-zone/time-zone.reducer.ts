import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITimeZone, defaultValue } from 'app/shared/model/time-zone.model';

export const ACTION_TYPES = {
  FETCH_TIMEZONE_LIST: 'timeZone/FETCH_TIMEZONE_LIST',
  FETCH_TIMEZONE: 'timeZone/FETCH_TIMEZONE',
  CREATE_TIMEZONE: 'timeZone/CREATE_TIMEZONE',
  UPDATE_TIMEZONE: 'timeZone/UPDATE_TIMEZONE',
  DELETE_TIMEZONE: 'timeZone/DELETE_TIMEZONE',
  RESET: 'timeZone/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITimeZone>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TimeZoneState = Readonly<typeof initialState>;

// Reducer

export default (state: TimeZoneState = initialState, action): TimeZoneState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIMEZONE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIMEZONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TIMEZONE):
    case REQUEST(ACTION_TYPES.UPDATE_TIMEZONE):
    case REQUEST(ACTION_TYPES.DELETE_TIMEZONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TIMEZONE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIMEZONE):
    case FAILURE(ACTION_TYPES.CREATE_TIMEZONE):
    case FAILURE(ACTION_TYPES.UPDATE_TIMEZONE):
    case FAILURE(ACTION_TYPES.DELETE_TIMEZONE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMEZONE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMEZONE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIMEZONE):
    case SUCCESS(ACTION_TYPES.UPDATE_TIMEZONE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIMEZONE):
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

const apiUrl = 'api/time-zones';

// Actions

export const getEntities: ICrudGetAllAction<ITimeZone> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TIMEZONE_LIST,
  payload: axios.get<ITimeZone>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITimeZone> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIMEZONE,
    payload: axios.get<ITimeZone>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITimeZone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIMEZONE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITimeZone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIMEZONE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITimeZone> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIMEZONE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
