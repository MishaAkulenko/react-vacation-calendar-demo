import request from "./request";

export default {
    GET_USERS_LIST(params) {
        return request('/users', params)
    }
}
