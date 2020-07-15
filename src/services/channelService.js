import { http } from "utils";

export const subscribeService = (id) =>
  http.get(`/users/${id}/togglesubscribe`);
