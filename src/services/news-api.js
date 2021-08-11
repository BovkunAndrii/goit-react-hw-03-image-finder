import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '21824668-10aeb8c8af54ec25684dd6884';

const fetchHits = ({ searchQuery = '', currentPage = 1 }) =>
  axios
    .get(
      `?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);

export { fetchHits };
