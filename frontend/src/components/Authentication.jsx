import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Auth';
import Weather from './Weather';

function Authentication(){

    

    return (
        <>
                  <BrowserRouter>
                      <Routes>
                            <Route exact path="/" element={<Auth />} />
                            <Route path="/weather" element={<Weather />} />
                      </Routes>
                  </BrowserRouter>
        </>
    );
}

export default Authentication;
