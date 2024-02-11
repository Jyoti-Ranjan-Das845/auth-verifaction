import axios from 'axios';

const currWeather = async (lat, lng) => {
    console.log('inside function',lat,lng);
    const res = await axios.get(`http://localhost:8080/${lat}/${lng}`);
    // console.log(res.data);
    return res.data;
}

// console.log(getWeather('delhi'));
// getWeather('delhi')

export default currWeather;