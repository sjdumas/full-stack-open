import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => axios.get(baseURL).then(response => response.data);

export default { getAll };
