import apiClient from "./apiClient"

export const testService = {
  getAll() {
    return apiClient.get("/test")
  }
}

