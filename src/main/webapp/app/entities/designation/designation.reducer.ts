import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDesignation, defaultValue } from 'app/shared/model/designation.model';

export const ACTION_TYPES = {
  FETCH_DESIGNATION_LIST: 'designation/FETCH_DESIGNATION_LIST',
  FETCH_DESIGNATION: 'designation/FETCH_DESIGNATION',
  CREATE_DESIGNATION: 'designation/CREATE_DESIGNATION',
  UPDATE_DESIGNATION: 'designation/UPDATE_DESIGNATION',
  DELETE_DESIGNATION: 'designation/DELETE_DESIGNATION',
  RESET: 'designation/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDesignation>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type DesignationState = Readonly<typeof initialState>;

// Reducer

export default (state: DesignationState = initialState, action): DesignationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DESIGNATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DESIGNATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DESIGNATION):
    case REQUEST(ACTION_TYPES.UPDATE_DESIGNATION):
    case REQUEST(ACTION_TYPES.DELETE_DESIGNATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DESIGNATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DESIGNATION):
    case FAILURE(ACTION_TYPES.CREATE_DESIGNATION):
    case FAILURE(ACTION_TYPES.UPDATE_DESIGNATION):
    case FAILURE(ACTION_TYPES.DELETE_DESIGNATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESIGNATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESIGNATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DESIGNATION):
    case SUCCESS(ACTION_TYPES.UPDATE_DESIGNATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DESIGNATION):
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

const apiUrl = 'api/designations';

// Actions

export const getEntities: ICrudGetAllAction<IDesignation> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DESIGNATION_LIST,
    payload: axios.get<IDesignation>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IDesignation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DESIGNATION,
    payload: axios.get<IDesignation>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDesignation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DESIGNATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDesignation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DESIGNATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDesignation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DESIGNATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
