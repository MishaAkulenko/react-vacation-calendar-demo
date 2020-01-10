import request from "./request";

export default {
    GET_USERS_LIST(params) {
        return request('/users', params)
    },
    SEND_SELECTED_VACATION(params) {
        return request('/save_vacation', params)
    },
}
