import axios from 'axios';


const VIDEOS_DATA_URL = 'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json'
const getData = async () => {
  try {
    const response = await axios.get(VIDEOS_DATA_URL);
    // Return the response data
    return response.data;
  } catch (error) {
    console.error(error)
    throw error;
  }
};

export default getData;
