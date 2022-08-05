import axios from "axios";
import constants from "./constants";

export const server = axios.create({ baseURL: constants.SERVER_PATH });

export const newsApi = axios.create({ baseURL: constants.NEWSAPI_PATH });
