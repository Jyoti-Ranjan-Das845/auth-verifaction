import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Auth';
import Weather from './Weather';
// import Glogin from "./Glogin";

// import '../public/css/Authentication.css'

function Authentication(){

    

    return (
        <>
                  <BrowserRouter>
                      <Routes>
                            <Route exact path="/" element={<Auth />} />
                            {/* <Route path="/glogin" element={<Glogin />} /> */}
                            <Route path="/weather" element={<Weather />} />
                            {/* <Route exact path="/" component={Auth} />
                            <Route path="/weather" component={Weather} /> */}
                      </Routes>
                  </BrowserRouter>
        </>
    );
}

export default Authentication;
