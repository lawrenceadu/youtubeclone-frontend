import { http } from "utils";

export const updateProfileService = (payload) => http.put("/users", payload);
