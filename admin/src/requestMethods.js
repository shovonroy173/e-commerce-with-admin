import axios from "axios";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accesssToken;
// console.log(TOKEN);
const BASE_URL = "http://localhost:5000/api/";
export const userRequest = axios.create({
    baseURL: BASE_URL , 
    headers:{ token : `Bearer ${TOKEN}`}
});

export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });