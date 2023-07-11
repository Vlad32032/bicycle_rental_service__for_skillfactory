import axios from "axios"

export const MY_CLIENT_ID = "6fd0c61a-b2e0-4e39-8bf1-d6a3f7423bea"
const API_URL = "https://sf-final-project-be.herokuapp.com/api"

export const $api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})