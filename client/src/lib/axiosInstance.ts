import axios from "axios";

const baseURL = "https://invitation-graduation-maker-api.vercel.app/api";

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;