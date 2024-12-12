import axios from "axios";
export const baseUrl = "chatapp-production-d49a.up.railway.app";
export const httpClient = axios.create({
  baseURL: baseUrl,
});
