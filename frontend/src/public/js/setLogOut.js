import axios from "axios";

const setLogOut = async() => {

    try {
        const response = await axios.get('http://localhost:8080/logout');
        // console.log(response.status, response.data.message);
        console.log(response);
        return { code: response.status, msg: response.data.message };
    } catch (error) {
        // console.error(error);
        // Handle error here
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.status, error.response.data.message);
            return { code: error.response.status, msg: error.response.data.message };
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        return { code: 500, msg: 'Internal Server Error' };
    }
}

export default setLogOut;