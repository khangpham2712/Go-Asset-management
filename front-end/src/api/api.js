import axios from "axios";
// import { setCookie } from "./cookie";

const URL = "http://localhost:3000";

export const login = async (info) => {
    const res = await axios.post(`${URL}/auth/login`, info)
        .then(function (response) {
            const dt = response.data.data;
            console.log(dt);
            // setCookie("user_id", dt.id, 30);
            // setCookie("role", dt.role, 30);
            return response;
        })
        .catch(function (error) {
            console.log(error.response.status);
            return error.response;
        });
    return res;
}