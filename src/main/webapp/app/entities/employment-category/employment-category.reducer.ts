import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmploymentCategory, defaultValue } from 'app/shared/model/employment-category.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYMENTCATEGORY_LIST: 'employmentCategory/FETCH_EMPLOYMENTCATEGORY_LIST',
  FETCH_EMPLOYMENTCATEGORY: 'employmentCategory/FETCH_EMPLOYMENTCATEGORY',
  CREATE_EMPLOYMENTCATEGORY: 'employmentCategory/CREATE_EMPLOYMENTCATEGORY',
  UPDATE_EMPLOYMENTCATEGORY: 'employmentCategory/UPDATE_EMPLOYMENTCATEGORY',
  DELETE_EMPLOYMENTCATEGORY: 'employmentCategory/DELETE_EMPLOYMENTCATEGORY',
  RESET: 'employmentCategory/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmploymentCategory>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type EmploymentCategoryState = Readonly<typeof initialState>;

// Reducer

export default (state: EmploymentCategoryState = initialState, action): EmploymentCategoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYMENTCATEGORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYMENTCATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYMENTCATEGORY):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYMENTCATEGORY):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYMENTCATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYMENTCATEGORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYMENTCATEGORY):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYMENTCATEGORY):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYMENTCATEGORY):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYMENTCATEGORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYMENTCATEGORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYMENTCATEGORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYMENTCATEGORY):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYMENTCATEGORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYMENTCATEGORY):
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

const apiUrl = 'api/employment-categories';

// Actions

export const getEntities: ICrudGetAllAction<IEmploymentCategory> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYMENTCATEGORY_LIST,
    payload: axios.get<IEmploymentCategory>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEmploymentCategory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYMENTCATEGORY,
    payload: axios.get<IEmploymentCategory>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmploymentCategory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYMENTCATEGORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmploymentCategory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYMENTCATEGORY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmploymentCategory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYMENTCATEGORY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
