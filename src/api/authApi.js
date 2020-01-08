import request from "./request";

export default {
    LOGIN(params) {
        return request('/login', params)
    }
}
