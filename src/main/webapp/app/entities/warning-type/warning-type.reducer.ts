import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWarningType, defaultValue } from 'app/shared/model/warning-type.model';

export const ACTION_TYPES = {
  FETCH_WARNINGTYPE_LIST: 'warningType/FETCH_WARNINGTYPE_LIST',
  FETCH_WARNINGTYPE: 'warningType/FETCH_WARNINGTYPE',
  CREATE_WARNINGTYPE: 'warningType/CREATE_WARNINGTYPE',
  UPDATE_WARNINGTYPE: 'warningType/UPDATE_WARNINGTYPE',
  DELETE_WARNINGTYPE: 'warningType/DELETE_WARNINGTYPE',
  RESET: 'warningType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWarningType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type WarningTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: WarningTypeState = initialState, action): WarningTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WARNINGTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WARNINGTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_WARNINGTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_WARNINGTYPE):
    case REQUEST(ACTION_TYPES.DELETE_WARNINGTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WARNINGTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WARNINGTYPE):
    case FAILURE(ACTION_TYPES.CREATE_WARNINGTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_WARNINGTYPE):
    case FAILURE(ACTION_TYPES.DELETE_WARNINGTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WARNINGTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_WARNINGTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_WARNINGTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_WARNINGTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_WARNINGTYPE):
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

const apiUrl = 'api/warning-types';

// Actions

export const getEntities: ICrudGetAllAction<IWarningType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_WARNINGTYPE_LIST,
    payload: axios.get<IWarningType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IWarningType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WARNINGTYPE,
    payload: axios.get<IWarningType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IWarningType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WARNINGTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWarningType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WARNINGTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWarningType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WARNINGTYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
