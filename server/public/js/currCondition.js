import axios from 'axios';

const getWeather = async (lat, long) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=a8d7b17ef7430767b77eef85fc283fd4`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default getWeather;