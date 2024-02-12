import '../public/css/App.css'
import Weather from './Weather.jsx';
import Auth from './Auth';
// import Signup from './Signup';
import Authentication from './Authentication';
import { useState } from 'react';

function App(){


    return(
        <>
          <div className="main-hold">
            <Authentication />
          </div>
        </>
    );
}

export default App;