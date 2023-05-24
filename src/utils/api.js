import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "608780faf4661cc99f95a8dd8a70e4e9";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params: {
        api_key: TMDB_TOKEN,
        ...params,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
