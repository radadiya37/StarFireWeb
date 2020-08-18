import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDesignationGroup, defaultValue } from 'app/shared/model/designation-group.model';

export const ACTION_TYPES = {
  FETCH_DESIGNATIONGROUP_LIST: 'designationGroup/FETCH_DESIGNATIONGROUP_LIST',
  FETCH_DESIGNATIONGROUP: 'designationGroup/FETCH_DESIGNATIONGROUP',
  CREATE_DESIGNATIONGROUP: 'designationGroup/CREATE_DESIGNATIONGROUP',
  UPDATE_DESIGNATIONGROUP: 'designationGroup/UPDATE_DESIGNATIONGROUP',
  DELETE_DESIGNATIONGROUP: 'designationGroup/DELETE_DESIGNATIONGROUP',
  RESET: 'designationGroup/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDesignationGroup>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type DesignationGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: DesignationGroupState = initialState, action): DesignationGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DESIGNATIONGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DESIGNATIONGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DESIGNATIONGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_DESIGNATIONGROUP):
    case REQUEST(ACTION_TYPES.DELETE_DESIGNATIONGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DESIGNATIONGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DESIGNATIONGROUP):
    case FAILURE(ACTION_TYPES.CREATE_DESIGNATIONGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_DESIGNATIONGROUP):
    case FAILURE(ACTION_TYPES.DELETE_DESIGNATIONGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESIGNATIONGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_DESIGNATIONGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DESIGNATIONGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_DESIGNATIONGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DESIGNATIONGROUP):
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

const apiUrl = 'api/designation-groups';

// Actions

export const getEntities: ICrudGetAllAction<IDesignationGroup> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DESIGNATIONGROUP_LIST,
    payload: axios.get<IDesignationGroup>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IDesignationGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DESIGNATIONGROUP,
    payload: axios.get<IDesignationGroup>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDesignationGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DESIGNATIONGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDesignationGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DESIGNATIONGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDesignationGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DESIGNATIONGROUP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
