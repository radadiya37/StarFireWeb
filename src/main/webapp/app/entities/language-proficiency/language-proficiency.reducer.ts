import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILanguageProficiency, defaultValue } from 'app/shared/model/language-proficiency.model';

export const ACTION_TYPES = {
  FETCH_LANGUAGEPROFICIENCY_LIST: 'languageProficiency/FETCH_LANGUAGEPROFICIENCY_LIST',
  FETCH_LANGUAGEPROFICIENCY: 'languageProficiency/FETCH_LANGUAGEPROFICIENCY',
  CREATE_LANGUAGEPROFICIENCY: 'languageProficiency/CREATE_LANGUAGEPROFICIENCY',
  UPDATE_LANGUAGEPROFICIENCY: 'languageProficiency/UPDATE_LANGUAGEPROFICIENCY',
  DELETE_LANGUAGEPROFICIENCY: 'languageProficiency/DELETE_LANGUAGEPROFICIENCY',
  RESET: 'languageProficiency/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILanguageProficiency>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type LanguageProficiencyState = Readonly<typeof initialState>;

// Reducer

export default (state: LanguageProficiencyState = initialState, action): LanguageProficiencyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LANGUAGEPROFICIENCY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LANGUAGEPROFICIENCY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LANGUAGEPROFICIENCY):
    case REQUEST(ACTION_TYPES.UPDATE_LANGUAGEPROFICIENCY):
    case REQUEST(ACTION_TYPES.DELETE_LANGUAGEPROFICIENCY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LANGUAGEPROFICIENCY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LANGUAGEPROFICIENCY):
    case FAILURE(ACTION_TYPES.CREATE_LANGUAGEPROFICIENCY):
    case FAILURE(ACTION_TYPES.UPDATE_LANGUAGEPROFICIENCY):
    case FAILURE(ACTION_TYPES.DELETE_LANGUAGEPROFICIENCY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LANGUAGEPROFICIENCY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LANGUAGEPROFICIENCY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LANGUAGEPROFICIENCY):
    case SUCCESS(ACTION_TYPES.UPDATE_LANGUAGEPROFICIENCY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LANGUAGEPROFICIENCY):
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

const apiUrl = 'api/language-proficiencies';

// Actions

export const getEntities: ICrudGetAllAction<ILanguageProficiency> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LANGUAGEPROFICIENCY_LIST,
  payload: axios.get<ILanguageProficiency>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ILanguageProficiency> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LANGUAGEPROFICIENCY,
    payload: axios.get<ILanguageProficiency>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILanguageProficiency> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LANGUAGEPROFICIENCY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILanguageProficiency> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LANGUAGEPROFICIENCY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILanguageProficiency> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LANGUAGEPROFICIENCY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
