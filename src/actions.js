// src/actions.js
import axios from 'axios';

export const fetchData = () => {
  const url = process.env.PUBLIC_URL + '/test.json'; // Now pointing to the public directory
  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        console.log('Fetched data:', response.data);
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
      });
  };
};
