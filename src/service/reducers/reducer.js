import { AUTHENTICATION_CHECK } from '../constants';
const initialState = {
    authenticationData: []
}
export default function authenticationInformation(state = [], action) {
    switch (action.type) {
        case AUTHENTICATION_CHECK:
            return {
                ...state,
                authenticationData: action.data.authenticationValidation
            }
        default:
            return state
    }


}
