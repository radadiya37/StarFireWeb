import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeTalent, defaultValue } from 'app/shared/model/employee-talent.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEETALENT_LIST: 'employeeTalent/FETCH_EMPLOYEETALENT_LIST',
  FETCH_EMPLOYEETALENT: 'employeeTalent/FETCH_EMPLOYEETALENT',
  CREATE_EMPLOYEETALENT: 'employeeTalent/CREATE_EMPLOYEETALENT',
  UPDATE_EMPLOYEETALENT: 'employeeTalent/UPDATE_EMPLOYEETALENT',
  DELETE_EMPLOYEETALENT: 'employeeTalent/DELETE_EMPLOYEETALENT',
  RESET: 'employeeTalent/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeTalent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeTalentState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeTalentState = initialState, action): EmployeeTalentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEETALENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEETALENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEETALENT):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEETALENT):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEETALENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEETALENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEETALENT):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEETALENT):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEETALENT):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEETALENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEETALENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEETALENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEETALENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEETALENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEETALENT):
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

const apiUrl = 'api/employee-talents';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeTalent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEETALENT_LIST,
  payload: axios.get<IEmployeeTalent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeTalent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEETALENT,
    payload: axios.get<IEmployeeTalent>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeTalent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEETALENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeTalent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEETALENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeTalent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEETALENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
