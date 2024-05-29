import axios from "axios";

// const localUrl = "http://localhost:3000/api";
const baseURL = "https://invitation-graduation-maker-api.vercel.app/api";

const instance = axios.create({
	baseURL: baseURL,
});

export default instance;
