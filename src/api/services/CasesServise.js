import { $api, MY_CLIENT_ID } from "../http";

export default class CasesSevice {
    static async createCasePublic(ownerFullName, licenseNumber, type, color, description) {
        return $api.post("/public/report", {ownerFullName, licenseNumber, type, color, description, clientId: MY_CLIENT_ID})
    }
    static async createCase(ownerFullName, licenseNumber, type, color, description) {
        return $api.post("/cases/", {ownerFullName, licenseNumber, type, color, description})
    }
    static async getAllCases() {
        return $api.get("/cases/")
    }
    static async getOneCase(id) {
        return $api.get(`/cases/${id}`)
    }
    static async deleteCase(id) {
        return $api.delete(`/cases/${id}`)
    }
    static async putCaseStatus(id, status) {
        return $api.put(`/cases/${id}`, {status})
    }
    static async putCaseResolution(id, status, resolution) {
        return $api.put(`/cases/${id}`, {status, resolution})
    }
    static async putCaseType(id, type) {
        return $api.put(`/cases/${id}`, {type})
    }
    static async putCaseColor(id, color) {
        return $api.put(`/cases/${id}`, {color})
    }
    static async putCaseDescription(id, description) {
        return $api.put(`/cases/${id}`, {description})
    }
    static async putCaseOwnerFullName(id, ownerFullName) {
        return $api.put(`/cases/${id}`, {ownerFullName})
    }
    static async putCaseOfficer(id, officer) {
        return $api.put(`/cases/${id}`, {officer})
    }
}