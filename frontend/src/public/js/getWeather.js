import axios from 'axios';

const getWeather = async (text) => {
    console.log('inside function');
    const res = await axios.get(`http://localhost:8080/fetch/${text}`);
    // console.log(res.data);
    return res.data;
}

// console.log(getWeather('delhi'));
// getWeather('delhi')

export default getWeather;