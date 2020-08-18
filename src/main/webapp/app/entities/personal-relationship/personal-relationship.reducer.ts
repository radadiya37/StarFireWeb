import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPersonalRelationship, defaultValue } from 'app/shared/model/personal-relationship.model';

export const ACTION_TYPES = {
  FETCH_PERSONALRELATIONSHIP_LIST: 'personalRelationship/FETCH_PERSONALRELATIONSHIP_LIST',
  FETCH_PERSONALRELATIONSHIP: 'personalRelationship/FETCH_PERSONALRELATIONSHIP',
  CREATE_PERSONALRELATIONSHIP: 'personalRelationship/CREATE_PERSONALRELATIONSHIP',
  UPDATE_PERSONALRELATIONSHIP: 'personalRelationship/UPDATE_PERSONALRELATIONSHIP',
  DELETE_PERSONALRELATIONSHIP: 'personalRelationship/DELETE_PERSONALRELATIONSHIP',
  RESET: 'personalRelationship/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPersonalRelationship>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PersonalRelationshipState = Readonly<typeof initialState>;

// Reducer

export default (state: PersonalRelationshipState = initialState, action): PersonalRelationshipState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PERSONALRELATIONSHIP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PERSONALRELATIONSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PERSONALRELATIONSHIP):
    case REQUEST(ACTION_TYPES.UPDATE_PERSONALRELATIONSHIP):
    case REQUEST(ACTION_TYPES.DELETE_PERSONALRELATIONSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PERSONALRELATIONSHIP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PERSONALRELATIONSHIP):
    case FAILURE(ACTION_TYPES.CREATE_PERSONALRELATIONSHIP):
    case FAILURE(ACTION_TYPES.UPDATE_PERSONALRELATIONSHIP):
    case FAILURE(ACTION_TYPES.DELETE_PERSONALRELATIONSHIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERSONALRELATIONSHIP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PERSONALRELATIONSHIP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PERSONALRELATIONSHIP):
    case SUCCESS(ACTION_TYPES.UPDATE_PERSONALRELATIONSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PERSONALRELATIONSHIP):
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

const apiUrl = 'api/personal-relationships';

// Actions

export const getEntities: ICrudGetAllAction<IPersonalRelationship> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PERSONALRELATIONSHIP_LIST,
  payload: axios.get<IPersonalRelationship>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPersonalRelationship> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PERSONALRELATIONSHIP,
    payload: axios.get<IPersonalRelationship>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPersonalRelationship> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PERSONALRELATIONSHIP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPersonalRelationship> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PERSONALRELATIONSHIP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPersonalRelationship> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PERSONALRELATIONSHIP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
