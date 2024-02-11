import axios from 'axios';

const getCondition = async (location) => {
    try {
        const encLocation = encodeURIComponent(location);
        // console.log(encLocation);

        const coord = await getCoord(encLocation);
        // console.log('Coordinates:', coord);

        const weather = await getWeather(coord.lat, coord.lng);
        // console.log('Weather:', weather);

        return weather;
    } catch (error) {
        console.log(error);
        throw error; // Propagate the error up the chain
    }
};

const getWeather = async (lat, long) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=a8d7b17ef7430767b77eef85fc283fd4`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getCoord = async (loc) => {
    try {
        console.log('Inside coord');
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=AIzaSyBCBft1pXJ_TbtKW0g26MONVa_aw4mLe2s`);
        return response.data.results[0].geometry.location;
        // console.log(response)
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// // Usage example:
// const fetchData = async () => {
//     try {
//         const result = await getCondition('Delhi');
//         console.log('Result:', result);
//     } catch (error) {
//         console.log(error);
//     }
// };

// fetchData(); // Call this function to see the result

export default getCondition;
