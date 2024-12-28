import axios from "axios";
// export const baseUrl = "https://chatapp-production-d49a.up.railway.app";
export const baseUrl = "http://localhost:8080";
export const httpClient = axios.create({
  baseURL: baseUrl,
});
