import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDocumentCategory, defaultValue } from 'app/shared/model/document-category.model';

export const ACTION_TYPES = {
  FETCH_DOCUMENTCATEGORY_LIST: 'documentCategory/FETCH_DOCUMENTCATEGORY_LIST',
  FETCH_DOCUMENTCATEGORY: 'documentCategory/FETCH_DOCUMENTCATEGORY',
  CREATE_DOCUMENTCATEGORY: 'documentCategory/CREATE_DOCUMENTCATEGORY',
  UPDATE_DOCUMENTCATEGORY: 'documentCategory/UPDATE_DOCUMENTCATEGORY',
  DELETE_DOCUMENTCATEGORY: 'documentCategory/DELETE_DOCUMENTCATEGORY',
  RESET: 'documentCategory/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDocumentCategory>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type DocumentCategoryState = Readonly<typeof initialState>;

// Reducer

export default (state: DocumentCategoryState = initialState, action): DocumentCategoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTCATEGORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOCUMENTCATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DOCUMENTCATEGORY):
    case REQUEST(ACTION_TYPES.UPDATE_DOCUMENTCATEGORY):
    case REQUEST(ACTION_TYPES.DELETE_DOCUMENTCATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTCATEGORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOCUMENTCATEGORY):
    case FAILURE(ACTION_TYPES.CREATE_DOCUMENTCATEGORY):
    case FAILURE(ACTION_TYPES.UPDATE_DOCUMENTCATEGORY):
    case FAILURE(ACTION_TYPES.DELETE_DOCUMENTCATEGORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTCATEGORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOCUMENTCATEGORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOCUMENTCATEGORY):
    case SUCCESS(ACTION_TYPES.UPDATE_DOCUMENTCATEGORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOCUMENTCATEGORY):
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

const apiUrl = 'api/document-categories';

// Actions

export const getEntities: ICrudGetAllAction<IDocumentCategory> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENTCATEGORY_LIST,
    payload: axios.get<IDocumentCategory>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IDocumentCategory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DOCUMENTCATEGORY,
    payload: axios.get<IDocumentCategory>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDocumentCategory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOCUMENTCATEGORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDocumentCategory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOCUMENTCATEGORY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDocumentCategory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOCUMENTCATEGORY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
