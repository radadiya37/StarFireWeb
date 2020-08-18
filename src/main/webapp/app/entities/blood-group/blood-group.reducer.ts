import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBloodGroup, defaultValue } from 'app/shared/model/blood-group.model';

export const ACTION_TYPES = {
  FETCH_BLOODGROUP_LIST: 'bloodGroup/FETCH_BLOODGROUP_LIST',
  FETCH_BLOODGROUP: 'bloodGroup/FETCH_BLOODGROUP',
  CREATE_BLOODGROUP: 'bloodGroup/CREATE_BLOODGROUP',
  UPDATE_BLOODGROUP: 'bloodGroup/UPDATE_BLOODGROUP',
  DELETE_BLOODGROUP: 'bloodGroup/DELETE_BLOODGROUP',
  RESET: 'bloodGroup/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBloodGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BloodGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: BloodGroupState = initialState, action): BloodGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BLOODGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BLOODGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BLOODGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_BLOODGROUP):
    case REQUEST(ACTION_TYPES.DELETE_BLOODGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BLOODGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BLOODGROUP):
    case FAILURE(ACTION_TYPES.CREATE_BLOODGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_BLOODGROUP):
    case FAILURE(ACTION_TYPES.DELETE_BLOODGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOODGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOODGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BLOODGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_BLOODGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BLOODGROUP):
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

const apiUrl = 'api/blood-groups';

// Actions

export const getEntities: ICrudGetAllAction<IBloodGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BLOODGROUP_LIST,
  payload: axios.get<IBloodGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBloodGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BLOODGROUP,
    payload: axios.get<IBloodGroup>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBloodGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BLOODGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBloodGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BLOODGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBloodGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BLOODGROUP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
