import http from '../http-common'

class AuthDataServices {
    getCurrentUser(){
        return http.get(`/cart/${customer_id}`);
    }
}
export default new AuthDataServices();