import { toast } from "react-toastify";
import http from "./http";

export default async (endpoint, data) => {
  try {
    const tokenRes = await http.post(`/auth/${endpoint}`, data);

    const config = {
      headers: { Authorization: `Bearer ${tokenRes.data.data}` },
    };

    const userRes = await http.get(`/auth/me`, config);

    const user = { ...userRes.data.data, token: tokenRes.data.data };

    // api.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${tokenRes.data.data}`;

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (err) {
    toast.dismiss();
    toast.error(err.response.data.message);
  }
};
