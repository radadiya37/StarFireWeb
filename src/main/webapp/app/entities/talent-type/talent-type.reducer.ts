import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITalentType, defaultValue } from 'app/shared/model/talent-type.model';

export const ACTION_TYPES = {
  FETCH_TALENTTYPE_LIST: 'talentType/FETCH_TALENTTYPE_LIST',
  FETCH_TALENTTYPE: 'talentType/FETCH_TALENTTYPE',
  CREATE_TALENTTYPE: 'talentType/CREATE_TALENTTYPE',
  UPDATE_TALENTTYPE: 'talentType/UPDATE_TALENTTYPE',
  DELETE_TALENTTYPE: 'talentType/DELETE_TALENTTYPE',
  RESET: 'talentType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITalentType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TalentTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: TalentTypeState = initialState, action): TalentTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TALENTTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TALENTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TALENTTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_TALENTTYPE):
    case REQUEST(ACTION_TYPES.DELETE_TALENTTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TALENTTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TALENTTYPE):
    case FAILURE(ACTION_TYPES.CREATE_TALENTTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_TALENTTYPE):
    case FAILURE(ACTION_TYPES.DELETE_TALENTTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TALENTTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_TALENTTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TALENTTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_TALENTTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TALENTTYPE):
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

const apiUrl = 'api/talent-types';

// Actions

export const getEntities: ICrudGetAllAction<ITalentType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TALENTTYPE_LIST,
    payload: axios.get<ITalentType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ITalentType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TALENTTYPE,
    payload: axios.get<ITalentType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITalentType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TALENTTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITalentType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TALENTTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITalentType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TALENTTYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
