import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
});


export const uploadPlantImage = (data) => API.post("/analyze", data);
export const getStatus = () => API.get("/status");
export const loginUser = (data) => API.post("/login", data);

export default API;
