import axios from "axios";
import constants from "./constants";

// const callApi = async (endpoint) => {
//   const response = await axios.get(constants.PATH + endpoint);
//   return response.data;
// };
// export default callApi;

export default axios.create({ baseURL: constants.PATH });
