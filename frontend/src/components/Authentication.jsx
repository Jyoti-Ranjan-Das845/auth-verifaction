import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Auth';
import Weather from './Weather';
// import '../public/css/Authentication.css'

function Authentication(){

    

    return (
        <>
                  <BrowserRouter>
                      <Routes>
                            <Route path="/" element={<Auth />} />
                            <Route path="/weather" element={<Weather />} />
                            {/* <Route exact path="/" component={Auth} />
                            <Route path="/weather" component={Weather} /> */}
                      </Routes>
                  </BrowserRouter>
        </>
    );
}

export default Authentication;