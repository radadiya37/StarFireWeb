import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReligion, defaultValue } from 'app/shared/model/religion.model';

export const ACTION_TYPES = {
  FETCH_RELIGION_LIST: 'religion/FETCH_RELIGION_LIST',
  FETCH_RELIGION: 'religion/FETCH_RELIGION',
  CREATE_RELIGION: 'religion/CREATE_RELIGION',
  UPDATE_RELIGION: 'religion/UPDATE_RELIGION',
  DELETE_RELIGION: 'religion/DELETE_RELIGION',
  RESET: 'religion/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReligion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ReligionState = Readonly<typeof initialState>;

// Reducer

export default (state: ReligionState = initialState, action): ReligionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RELIGION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RELIGION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RELIGION):
    case REQUEST(ACTION_TYPES.UPDATE_RELIGION):
    case REQUEST(ACTION_TYPES.DELETE_RELIGION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RELIGION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RELIGION):
    case FAILURE(ACTION_TYPES.CREATE_RELIGION):
    case FAILURE(ACTION_TYPES.UPDATE_RELIGION):
    case FAILURE(ACTION_TYPES.DELETE_RELIGION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RELIGION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RELIGION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RELIGION):
    case SUCCESS(ACTION_TYPES.UPDATE_RELIGION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RELIGION):
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

const apiUrl = 'api/religions';

// Actions

export const getEntities: ICrudGetAllAction<IReligion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RELIGION_LIST,
  payload: axios.get<IReligion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IReligion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RELIGION,
    payload: axios.get<IReligion>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IReligion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RELIGION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReligion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RELIGION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReligion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RELIGION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
