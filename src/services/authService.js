import { http } from "utils";

export const loginService = (payload) => http.post("/auth/login", payload);
export const signupService = (payload) => http.post("/auth/signup", payload);
export const meService = (payload) => http.get("/auth/me");
