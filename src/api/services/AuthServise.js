import { $api, MY_CLIENT_ID } from "../http";

export default class AuthSevice {
    static async registration(email, password, firstName, lastName) {
        return $api.post("/auth/sign_up", {email, password, firstName, lastName, clientId: MY_CLIENT_ID})
    }
    static async login(email, password) {
        return $api.post("/auth/sign_in", {email, password})
    }
    static async check() {
        return $api.get("/auth/")
    }
}