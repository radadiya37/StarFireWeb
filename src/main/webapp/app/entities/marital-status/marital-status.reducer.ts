import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMaritalStatus, defaultValue } from 'app/shared/model/marital-status.model';

export const ACTION_TYPES = {
  FETCH_MARITALSTATUS_LIST: 'maritalStatus/FETCH_MARITALSTATUS_LIST',
  FETCH_MARITALSTATUS: 'maritalStatus/FETCH_MARITALSTATUS',
  CREATE_MARITALSTATUS: 'maritalStatus/CREATE_MARITALSTATUS',
  UPDATE_MARITALSTATUS: 'maritalStatus/UPDATE_MARITALSTATUS',
  DELETE_MARITALSTATUS: 'maritalStatus/DELETE_MARITALSTATUS',
  RESET: 'maritalStatus/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMaritalStatus>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MaritalStatusState = Readonly<typeof initialState>;

// Reducer

export default (state: MaritalStatusState = initialState, action): MaritalStatusState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MARITALSTATUS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MARITALSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MARITALSTATUS):
    case REQUEST(ACTION_TYPES.UPDATE_MARITALSTATUS):
    case REQUEST(ACTION_TYPES.DELETE_MARITALSTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MARITALSTATUS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MARITALSTATUS):
    case FAILURE(ACTION_TYPES.CREATE_MARITALSTATUS):
    case FAILURE(ACTION_TYPES.UPDATE_MARITALSTATUS):
    case FAILURE(ACTION_TYPES.DELETE_MARITALSTATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MARITALSTATUS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MARITALSTATUS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MARITALSTATUS):
    case SUCCESS(ACTION_TYPES.UPDATE_MARITALSTATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MARITALSTATUS):
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

const apiUrl = 'api/marital-statuses';

// Actions

export const getEntities: ICrudGetAllAction<IMaritalStatus> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MARITALSTATUS_LIST,
  payload: axios.get<IMaritalStatus>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMaritalStatus> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MARITALSTATUS,
    payload: axios.get<IMaritalStatus>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMaritalStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MARITALSTATUS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMaritalStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MARITALSTATUS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMaritalStatus> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MARITALSTATUS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
