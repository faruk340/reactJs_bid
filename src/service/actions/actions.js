import { AUTHENTICATION_CHECK } from '../constants';
export const authenticationCheck = (data) => {
    return {
        type: AUTHENTICATION_CHECK,
        data: data
    }
}