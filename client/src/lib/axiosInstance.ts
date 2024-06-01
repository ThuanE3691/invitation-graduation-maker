import axios from "axios";

const localUrl = "http://localhost:3000/api";
const productionURL = "https://invitation-graduation-maker-api.vercel.app/api";

let url = process.env.NODE_ENV === "production" ? productionURL : localUrl;

const instance = axios.create({
	baseURL: url,
});

export default instance;
