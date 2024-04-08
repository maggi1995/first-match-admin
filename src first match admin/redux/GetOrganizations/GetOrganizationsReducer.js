import { GET_ORGANIZATIONS_REQUEST } from './GetOrganizationsTypes';
import { GET_ORGANIZATIONS_SUCCESS } from './GetOrganizationsTypes';
import { GET_ORGANIZATIONS_FAILURE } from './GetOrganizationsTypes';
import { GET_ORGANIZATIONS_UPDATE } from './GetOrganizationsTypes';

const initialstate = {
    loading: true,
    organizationsList: [],
    error: ''
};
export function GetOrganizationsReducer(state = initialstate, action) {
    switch (action.type) {
        case GET_ORGANIZATIONS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ORGANIZATIONS_SUCCESS:
            return {
                loading: false,
                ...state,
                organizationsList: action.organizationsList,
                error: ''
            };
        case GET_ORGANIZATIONS_FAILURE:
            return {
                loading: false,
                ...state,
                organizationsList: [],
                error: action.payload
            };
        case GET_ORGANIZATIONS_UPDATE:
            return {
                loading: false,
                ...state,
                organizationsList: action.organizationsList,
                error: ''
            };

        default:
            return state;
    }
}
export default { GetOrganizationsReducer };
