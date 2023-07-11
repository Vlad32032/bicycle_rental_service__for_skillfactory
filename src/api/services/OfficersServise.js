import { $api } from "../http"

export default class OfficersServise {
    static async getAllOfficers() {
        return $api.get("/officers/")
    }
    static async getOfficer(id) {
        return $api.get(`/officers/${id}`)
    }
    static async deleteOfficer(id) {
        return $api.delete(`/officers/${id}`)
    }
    static async approvedOfficer(id, approved) {
        return $api.put(`/officers/${id}`, {approved})
    }
    static async redactFirstNameOfficer(id, firstName) {
        return $api.put(`/officers/${id}`, {firstName})
    }
    static async redactLastNameOfficer(id, lastName) {
        return $api.put(`/officers/${id}`, {lastName})
    }
}