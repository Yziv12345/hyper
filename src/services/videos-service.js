import axios from 'axios';


const VISDEO_DATA_URL = 'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json'
// Define a function to make a generic GET request
const getData = async () => {
  try {
    // Make the GET request using Axios
    const response = await axios.get(VISDEO_DATA_URL);
    // Return the response data
    return response.data;
  } catch (error) {
    // If an error occurs, throw the error
    console.error(error)
    throw error;
  }
};

export default getData;
