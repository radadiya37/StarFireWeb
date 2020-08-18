import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeAddress, defaultValue } from 'app/shared/model/employee-address.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEADDRESS_LIST: 'employeeAddress/FETCH_EMPLOYEEADDRESS_LIST',
  FETCH_EMPLOYEEADDRESS: 'employeeAddress/FETCH_EMPLOYEEADDRESS',
  CREATE_EMPLOYEEADDRESS: 'employeeAddress/CREATE_EMPLOYEEADDRESS',
  UPDATE_EMPLOYEEADDRESS: 'employeeAddress/UPDATE_EMPLOYEEADDRESS',
  DELETE_EMPLOYEEADDRESS: 'employeeAddress/DELETE_EMPLOYEEADDRESS',
  RESET: 'employeeAddress/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeAddress>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeAddressState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeAddressState = initialState, action): EmployeeAddressState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEADDRESS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEADDRESS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEADDRESS):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEADDRESS):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEADDRESS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEADDRESS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEADDRESS):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEADDRESS):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEADDRESS):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEADDRESS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEADDRESS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEADDRESS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEADDRESS):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEADDRESS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEADDRESS):
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

const apiUrl = 'api/employee-addresses';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeAddress> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEADDRESS_LIST,
  payload: axios.get<IEmployeeAddress>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeAddress> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEADDRESS,
    payload: axios.get<IEmployeeAddress>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeAddress> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEADDRESS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeAddress> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEADDRESS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeAddress> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEADDRESS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
