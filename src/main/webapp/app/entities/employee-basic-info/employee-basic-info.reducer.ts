import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployeeBasicInfo, defaultValue } from 'app/shared/model/employee-basic-info.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEEBASICINFO_LIST: 'employeeBasicInfo/FETCH_EMPLOYEEBASICINFO_LIST',
  FETCH_EMPLOYEEBASICINFO: 'employeeBasicInfo/FETCH_EMPLOYEEBASICINFO',
  CREATE_EMPLOYEEBASICINFO: 'employeeBasicInfo/CREATE_EMPLOYEEBASICINFO',
  UPDATE_EMPLOYEEBASICINFO: 'employeeBasicInfo/UPDATE_EMPLOYEEBASICINFO',
  DELETE_EMPLOYEEBASICINFO: 'employeeBasicInfo/DELETE_EMPLOYEEBASICINFO',
  RESET: 'employeeBasicInfo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeBasicInfo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EmployeeBasicInfoState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeBasicInfoState = initialState, action): EmployeeBasicInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEBASICINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEEBASICINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEEBASICINFO):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEEBASICINFO):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEEBASICINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEBASICINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEEBASICINFO):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEEBASICINFO):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEEBASICINFO):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEEBASICINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEBASICINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEEBASICINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEEBASICINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEEBASICINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEEBASICINFO):
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

const apiUrl = 'api/employee-basic-infos';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeBasicInfo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EMPLOYEEBASICINFO_LIST,
  payload: axios.get<IEmployeeBasicInfo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEmployeeBasicInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEEBASICINFO,
    payload: axios.get<IEmployeeBasicInfo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeBasicInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEEBASICINFO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeBasicInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEEBASICINFO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeBasicInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEEBASICINFO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
