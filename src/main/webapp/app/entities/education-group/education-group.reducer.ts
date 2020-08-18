import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEducationGroup, defaultValue } from 'app/shared/model/education-group.model';

export const ACTION_TYPES = {
  FETCH_EDUCATIONGROUP_LIST: 'educationGroup/FETCH_EDUCATIONGROUP_LIST',
  FETCH_EDUCATIONGROUP: 'educationGroup/FETCH_EDUCATIONGROUP',
  CREATE_EDUCATIONGROUP: 'educationGroup/CREATE_EDUCATIONGROUP',
  UPDATE_EDUCATIONGROUP: 'educationGroup/UPDATE_EDUCATIONGROUP',
  DELETE_EDUCATIONGROUP: 'educationGroup/DELETE_EDUCATIONGROUP',
  RESET: 'educationGroup/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEducationGroup>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type EducationGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: EducationGroupState = initialState, action): EducationGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EDUCATIONGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EDUCATIONGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EDUCATIONGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_EDUCATIONGROUP):
    case REQUEST(ACTION_TYPES.DELETE_EDUCATIONGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EDUCATIONGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EDUCATIONGROUP):
    case FAILURE(ACTION_TYPES.CREATE_EDUCATIONGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_EDUCATIONGROUP):
    case FAILURE(ACTION_TYPES.DELETE_EDUCATIONGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EDUCATIONGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_EDUCATIONGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EDUCATIONGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_EDUCATIONGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EDUCATIONGROUP):
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

const apiUrl = 'api/education-groups';

// Actions

export const getEntities: ICrudGetAllAction<IEducationGroup> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EDUCATIONGROUP_LIST,
    payload: axios.get<IEducationGroup>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEducationGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EDUCATIONGROUP,
    payload: axios.get<IEducationGroup>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEducationGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EDUCATIONGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEducationGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EDUCATIONGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEducationGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EDUCATIONGROUP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
