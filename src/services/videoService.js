import { http } from "utils";

export const addToHistoryService = (id) => http.get(`/videos/${id}/view`);
export const addCommentService = (id, payload) =>
  http.post(`/videos/${id}/comment`, payload);
export const uploadVideoService = (payload) => http.post("videos", payload);
