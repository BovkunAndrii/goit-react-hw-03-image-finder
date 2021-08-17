import axios from "axios";

const API_KEY = "21713513-de4fa038d3971b80a05884d99";

const apiService = ({ query = "", page = 1 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=15`
    )
    .then(({ data }) => data.hits);
};

export default apiService;
